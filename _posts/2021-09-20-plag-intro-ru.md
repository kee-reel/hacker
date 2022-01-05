---
title: Создание первых плагинов
published: true
tag: plag
lang: ru
---

Требования к окружению:

* Qt 6.2 GCC (CMake в коплекте)
* QtCreator 4.x
* Bash
* Git

Клонируй репозиторий с основным приложением:

```bash
git clone https://gitlab.com/kee-reel/PLAG.git
```

Зайди внутрь папки с основным приложением и клонируй репозиторий с инструментами для разработки плагинов:

```bash
cd PLAG
git clone https://gitlab.com/kee-reel/PLAGins.git
```

Зайди внутрь папки с инструментами для разработки плагинов и запусти скрипт для создания нового плагина (из папки PLAGins):

```bash
cd PLAGins
./Scripts/generate_plugin_code.sh
```

Через него ты можешь генерировать основу кода для любого плагина.

Давай начнём с плагина логики -- он будет предоставлять только программный интерфейс (плагин с графическим пользовательским интерфейсом добавим сразу после).

```
$ ./Scripts/generate_plugin_code.sh
Specify name of your plugin: TestLogic
Your plugin is graphical user interface for other plugin? (y/n) n
Are you planning to provide some of your plugin's functionality to other plugins? (y/n) y
Specify name of your plugin's interface (press Enter to use suggested name: ITestLogic):
Specify filename of your plugin's interface (press enter to use suggested name: i_test_logic.h):
[SUCCESS] Your generated plugin could be found in ./Plugins/TestLogic directory.
There is CMakeLists.txt file that could be opened with QtCreator.
```

А теперь создай плагин, который будет предоставлять графический пользовательский интерфейс для нашего новосозданного плагина с логикой TestLogic:

```
$ ./Scripts/generate_plugin_code.sh 
Specify name of your plugin: TestUI
Your plugin is graphical user interface for other plugin? (y/n) y
Your plugin will use:
1 - QML(recommended)
2 - QWidjets
Type option number: 1
Your plugin is graphical user interface of other plugin.
Please, choose name of file that contains interface of that plugin:
0: icontactlist.h
1: idayplan.h
2: i_dev_plugin_info_data_extention.h
3: i_dev_project_manager_data_extention.h
4: i_habits_tracker_data_ext.h
5: i_habits_tracker.h
6: imusicplayer.h
7: i_music_player_track_data_extention.h
8: i_music_player_track_progress_data_extention.h
9: ipomodoromanager.h
10: ipomodorosettingsdataextention.h
11: iprojectmanager.h
12: i_test_logic.h
13: i_user_task_data_ext.h
14: i_user_task_date_data_ext.h
15: i_user_task_image_data_ext.h
16: i_user_task_notes_data_ext.h
17: i_user_task_pomodoro_data_ext.h
18: i_user_task_project_data_ext.h
19: i_user_task_repeat_data_ext.h
20: iusertaskscalendar.h
21: iworktimermodel.h
File index: 12
[SUCCESS] Your generated plugin could be found in ./Plugins/TestUI directory.
There is CMakeLists.txt file that could be opened with QtCreator.
```

Проекты плагинов TestLogic и TestUI лежат в PLAG/PLAGins/Plugins -- открой их, а также проект основного приложения в PLAG/Application через QtCreator.

> Чтобы открыть проект, надо в QtCreator нажать Ctrl+O, и выбрать CMakeLists.txt соответствующего проекта.

Собери проекты TestLogic и TestUI, а потом запусти проект PLAG.

Если запустится окно приложения, то всё прошло успешно и можно начинать разработку!

![No core plugin](/assets/images/plag-no-core.png)

Однако, основное приложение ругается что нет корневого плагина -- мы разберём что это такое позже, а пока давай его закинем в нужную папку.

Ты можешь:

* Скачать архив с собранными DLL самых важных плагинов: для [linux](/plugins_linux.zip) или [windows](/plugins_win.zip) и распаковать его содержимое в PLAG/Application/Plugins.

* Или клонировать себе репозитории этих плагинов (находясь в PLAG/PLAGins/Plugins), и собрать их:

```bash
cd Plugins
git clone https://gitlab.com/kee-reel/Core.git
git clone https://gitlab.com/kee-reel/AsyncDataBase.git
git clone https://gitlab.com/kee-reel/ExtendableDataManager.git
git clone https://gitlab.com/kee-reel/PluginLinker.git
git clone https://gitlab.com/kee-reel/PluginLinkerView.git
git clone https://gitlab.com/kee-reel/GUIManager.git
git clone https://gitlab.com/kee-reel/GridMainMenuView.git
```

Независимо от выбранного способа, попробуй запустить приложение после того, как DLL этих плагинов будут в PLAG/Application/Plugins -- ты должен увидеть этот экран:

![First menu](/assets/images/plag-first-menu.png)

Тут ты можешь увидеть иконку своего плагина TestUI, который использует логику плагина TestLogic. Можешь зайти в этот плагин, и поиграться с ним.

Обрати внимание что в логах будут выводиться сообщения при вводе текста. Попробуй найти в проекте плагина TestLogic место, где выводится этот текст.

В следующей статье я расскажу как после корневого плагина, который запускает основное приложение, разворачиваются все остальные плагины.

P.S.: репозитории существующих плагинов:

----

# Core plugin
Core [https://gitlab.com/kee-reel/Core.git](https://gitlab.com/kee-reel/Core.git)

----
# Data base
DataBase [https://gitlab.com/kee-reel/DataBase.git](https://gitlab.com/kee-reel/DataBase.git)

AsyncDataBase [https://gitlab.com/kee-reel/AsyncDataBase.git](https://gitlab.com/kee-reel/AsyncDataBase.git)

ExtendableDataManager [https://gitlab.com/kee-reel/ExtendableDataManager.git](https://gitlab.com/kee-reel/ExtendableDataManager.git)

----
# Plugin linker
PluginLinker [https://gitlab.com/kee-reel/PluginLinker.git](https://gitlab.com/kee-reel/PluginLinker.git)

**GUI**

PluginLinkerView [https://gitlab.com/kee-reel/PluginLinkerView.git](https://gitlab.com/kee-reel/PluginLinkerView.git)

**CLI**

PluginLinkerCommand [https://gitlab.com/kee-reel/PluginLinkerCommand.git](https://gitlab.com/kee-reel/PluginLinkerCommand.git)

----

# Notifications
NotificationManager [https://gitlab.com/kee-reel/NotificationManager.git](https://gitlab.com/kee-reel/NotificationManager.git)

----
# GUI manager
GUIManager [https://gitlab.com/kee-reel/GUIManager.git](https://gitlab.com/kee-reel/GUIManager.git)

**GUI**

GridMainMenuView [https://gitlab.com/kee-reel/GridMainMenuView.git](https://gitlab.com/kee-reel/GridMainMenuView.git)

----
# CLI manager
CLIManager [https://gitlab.com/kee-reel/CLIManager.git](https://gitlab.com/kee-reel/CLIManager.git)

----
# Music player
MusicPlayer [https://gitlab.com/kee-reel/MusicPlayer.git](https://gitlab.com/kee-reel/MusicPlayer.git)

**GUI**

MusicPlayerView [https://gitlab.com/kee-reel/MusicPlayerView.git](https://gitlab.com/kee-reel/MusicPlayerView.git)

**Data extentions**

MusicPlayerTrackDataExtention [https://gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git](https://gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git)

MusicPlayerTrackProgressDataExtention [https://gitlab.com/kee-reel/MusicPlayerTrackProgressDataExtention.git](https://gitlab.com/kee-reel/MusicPlayerTrackProgressDataExtention.git)

----
# Personal task manager
HabitsTracker [https://gitlab.com/kee-reel/HabitsTracker.git](https://gitlab.com/kee-reel/HabitsTracker.git)

PomodoroManager [https://gitlab.com/kee-reel/PomodoroManager.git](https://gitlab.com/kee-reel/PomodoroManager.git)

PomodoroManagerView [https://gitlab.com/kee-reel/PomodoroManagerView.git](https://gitlab.com/kee-reel/PomodoroManagerView.git)

TaskSketchManager [https://gitlab.com/kee-reel/TaskSketchManager.git](https://gitlab.com/kee-reel/TaskSketchManager.git)

TaskSketchManagerView [https://gitlab.com/kee-reel/TaskSketchManagerView.git](https://gitlab.com/kee-reel/TaskSketchManagerView.git)

UserTaskNotes [https://gitlab.com/kee-reel/UserTaskNotes.git](https://gitlab.com/kee-reel/UserTaskNotes.git)

UserTasksCalendar git@gitlab.com:kee-reel/UserTasksCalendar.git

**GUI**

ToDoListView [https://gitlab.com/kee-reel/ToDoListView.git](https://gitlab.com/kee-reel/ToDoListView.git)

UserTaskManagerView [https://gitlab.com/kee-reel/UserTaskManagerView.git](https://gitlab.com/kee-reel/UserTaskManagerView.git)

UserTaskNotesView [https://gitlab.com/kee-reel/UserTaskNotesView.git](https://gitlab.com/kee-reel/UserTaskNotesView.git)

UserTasksCalendarView [https://gitlab.com/kee-reel/UserTasksCalendarView.git](https://gitlab.com/kee-reel/UserTasksCalendarView.git)

HabitsTrackerView [https://gitlab.com/kee-reel/HabitsTrackerView.git](https://gitlab.com/kee-reel/HabitsTrackerView.git)

**CLI**

ToDoListCommand [https://gitlab.com/kee-reel/ToDoListCommand.git](https://gitlab.com/kee-reel/ToDoListCommand.git)

**Data extentions**

PomodoroSettingsDataExtention [https://gitlab.com/kee-reel/PomodoroSettingsDataExtention.git](https://gitlab.com/kee-reel/PomodoroSettingsDataExtention.git)

UserTaskDataExtention [https://gitlab.com/kee-reel/UserTaskDataExtention.git](https://gitlab.com/kee-reel/UserTaskDataExtention.git)

UserTaskDateDataExtention [https://gitlab.com/kee-reel/UserTaskDateDataExtention.git](https://gitlab.com/kee-reel/UserTaskDateDataExtention.git)

UserTaskPomodoroDataExtention [https://gitlab.com/kee-reel/UserTaskPomodoroDataExtention.git](https://gitlab.com/kee-reel/UserTaskPomodoroDataExtention.git)

UserTaskProjectDataExtention [https://gitlab.com/kee-reel/UserTaskProjectDataExtention.git](https://gitlab.com/kee-reel/UserTaskProjectDataExtention.git)

UserTaskRepeatDataExtention [https://gitlab.com/kee-reel/UserTaskRepeatDataExtention.git](https://gitlab.com/kee-reel/UserTaskRepeatDataExtention.git)

HabitsTrackerDataExtention [https://gitlab.com/kee-reel/HabitsTrackerDataExtention.git](https://gitlab.com/kee-reel/HabitsTrackerDataExtention.git)

----
# Dev
ProjectManager [https://gitlab.com/kee-reel/ProjectManager.git](https://gitlab.com/kee-reel/ProjectManager.git)

**GUI**

ProjectManagerView [https://gitlab.com/kee-reel/ProjectManagerView.git](https://gitlab.com/kee-reel/ProjectManagerView.git)

**Data extentions**

DevPluginInfoDataExtention [https://gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git](https://gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git)

DevProjectManagerDataExtention [https://gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git](https://gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git)
