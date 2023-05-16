---
language: ru
title: How to start
date: 2022-06-05
---

# Plugin development framework for [PLAG](https://gitlab.com/c4rb0n_un1t/PLAG)
----

Prereqisits:

* Qt 6.1.2 GCC (with CMake)
* QtCreator 4.x
* Bash
* Git

Clone repo of main application:

```bash
git clone https://gitlab.com/c4rb0n_un1t/PLAG.git
```

Go into PLAG folder and clone framework for plugins development:

```bash
cd PLAG
git clone https://gitlab.com/c4rb0n_un1t/PLAGins.git
```

Go into PLAGins folder and run plugin solution generation script (from PLUGins folder): 

```bash
cd PLAGins
./Scripts/generate_plugin_code.sh
```

With this script you can generate base for any plugin.

Let's start with logic-only plugin -- it will provide only C++ interface without GUI (we will add GUI later).


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

Now, lets create plugin, that will provide GUI for our new TestLogic plugin:

```
$ ./Scripts/generate_plugin_code.sh 
Specify name of your plugin: TestUI
Your plugin is graphical user interface for other plugin? (y/n) y
Your plugin will use:
1 - QML(recommended)
2 - QWidjets
Type option number: 1
Your plugin is graphical user interface of other plugin. Please, choose name of file that contains interface of that plugin:
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

Projects of TestLogic and TestUI plugins could be found in PLAGins/Plugins folder. Open these projects and project of main application in PLAG/Application with QtCreator.

> To open project in QtCreator press Ctrl+O and choose CMakeLists.txt inside project folder

Build projects TestLogic and TestUI, and then run PLAG project.

You should see window like this:

![No core plugin](/assets/images/plag-no-core.png)

> If your application can't start -- contact me. We'll figure out what happened and I will add solution to your problem into FAQ.

It means that main application can't find any core plugin.

We will discuss what core plugin is in details later, but for now let's just provide this core plugin (and a bunch of other neccessary plugins).

Download this [archive](/Plugins.zip) and unpack it's contents inside PLAG/Application/Plugins.

Now it should work:

![First menu](/assets/images/plag-first-menu.png)

# Other plugins

Same as yours, all other plugins have it's own solutions. Here is full list of these plugins repositories:

----

# Core plugin
Core [gitlab.com/kee-reel/Core.git](https://gitlab.com/kee-reel/Core.git)

----
# Data base
DataBase [gitlab.com/kee-reel/DataBase.git](https://gitlab.com/kee-reel/DataBase.git)

AsyncDataBase [gitlab.com/kee-reel/AsyncDataBase.git](https://gitlab.com/kee-reel/AsyncDataBase.git)

ExtendableDataManager [gitlab.com/kee-reel/ExtendableDataManager.git](https://gitlab.com/kee-reel/ExtendableDataManager.git)

----
# Plugin linker
PluginLinker [gitlab.com/kee-reel/PluginLinker.git](https://gitlab.com/kee-reel/PluginLinker.git)

**GUI**

PluginLinkerView [gitlab.com/kee-reel/PluginLinkerView.git](https://gitlab.com/kee-reel/PluginLinkerView.git)

**CLI**

PluginLinkerCommand [gitlab.com/kee-reel/PluginLinkerCommand.git](https://gitlab.com/kee-reel/PluginLinkerCommand.git)

----

# Notifications
NotificationManager [gitlab.com/kee-reel/NotificationManager.git](https://gitlab.com/kee-reel/NotificationManager.git)

----
# GUI manager
GUIManager [gitlab.com/kee-reel/GUIManager.git](https://gitlab.com/kee-reel/GUIManager.git)

**GUI**

GridMainMenuView [gitlab.com/kee-reel/GridMainMenuView.git](https://gitlab.com/kee-reel/GridMainMenuView.git)

----
# CLI manager
CLIManager [gitlab.com/kee-reel/CLIManager.git](https://gitlab.com/kee-reel/CLIManager.git)

----
# Music player
MusicPlayer [gitlab.com/kee-reel/MusicPlayer.git](https://gitlab.com/kee-reel/MusicPlayer.git)

**GUI**

MusicPlayerView [gitlab.com/kee-reel/MusicPlayerView.git](https://gitlab.com/kee-reel/MusicPlayerView.git)

**Data extentions**

MusicPlayerTrackDataExtention [gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git](https://gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git)

MusicPlayerTrackProgressDataExtention [gitlab.com/kee-reel/MusicPlayerTrackProgressDataExtention.git](https://gitlab.com/kee-reel/MusicPlayerTrackProgressDataExtention.git)

----
# Personal task manager
HabitsTracker [gitlab.com/kee-reel/HabitsTracker.git](https://gitlab.com/kee-reel/HabitsTracker.git)

PomodoroManager [gitlab.com/kee-reel/PomodoroManager.git](https://gitlab.com/kee-reel/PomodoroManager.git)

PomodoroManagerView [gitlab.com/kee-reel/PomodoroManagerView.git](https://gitlab.com/kee-reel/PomodoroManagerView.git)

TaskSketchManager [gitlab.com/kee-reel/TaskSketchManager.git](https://gitlab.com/kee-reel/TaskSketchManager.git)

TaskSketchManagerView [gitlab.com/kee-reel/TaskSketchManagerView.git](https://gitlab.com/kee-reel/TaskSketchManagerView.git)

UserTaskNotes [gitlab.com/kee-reel/UserTaskNotes.git](https://gitlab.com/kee-reel/UserTaskNotes.git)

UserTasksCalendar git@gitlab.com:kee-reel/UserTasksCalendar.git

**GUI**

ToDoListView [gitlab.com/kee-reel/ToDoListView.git](https://gitlab.com/kee-reel/ToDoListView.git)

UserTaskManagerView [gitlab.com/kee-reel/UserTaskManagerView.git](https://gitlab.com/kee-reel/UserTaskManagerView.git)

UserTaskNotesView [gitlab.com/kee-reel/UserTaskNotesView.git](https://gitlab.com/kee-reel/UserTaskNotesView.git)

UserTasksCalendarView [gitlab.com/kee-reel/UserTasksCalendarView.git](https://gitlab.com/kee-reel/UserTasksCalendarView.git)

HabitsTrackerView [gitlab.com/kee-reel/HabitsTrackerView.git](https://gitlab.com/kee-reel/HabitsTrackerView.git)

**CLI**

ToDoListCommand [gitlab.com/kee-reel/ToDoListCommand.git](https://gitlab.com/kee-reel/ToDoListCommand.git)

**Data extentions**

PomodoroSettingsDataExtention [gitlab.com/kee-reel/PomodoroSettingsDataExtention.git](https://gitlab.com/kee-reel/PomodoroSettingsDataExtention.git)

UserTaskDataExtention [gitlab.com/kee-reel/UserTaskDataExtention.git](https://gitlab.com/kee-reel/UserTaskDataExtention.git)

UserTaskDateDataExtention [gitlab.com/kee-reel/UserTaskDateDataExtention.git](https://gitlab.com/kee-reel/UserTaskDateDataExtention.git)

UserTaskPomodoroDataExtention [gitlab.com/kee-reel/UserTaskPomodoroDataExtention.git](https://gitlab.com/kee-reel/UserTaskPomodoroDataExtention.git)

UserTaskProjectDataExtention [gitlab.com/kee-reel/UserTaskProjectDataExtention.git](https://gitlab.com/kee-reel/UserTaskProjectDataExtention.git)

UserTaskRepeatDataExtention [gitlab.com/kee-reel/UserTaskRepeatDataExtention.git](https://gitlab.com/kee-reel/UserTaskRepeatDataExtention.git)

HabitsTrackerDataExtention [gitlab.com/kee-reel/HabitsTrackerDataExtention.git](https://gitlab.com/kee-reel/HabitsTrackerDataExtention.git)

----
# Dev
ProjectManager [gitlab.com/kee-reel/ProjectManager.git](https://gitlab.com/kee-reel/ProjectManager.git)

**GUI**

ProjectManagerView [gitlab.com/kee-reel/ProjectManagerView.git](https://gitlab.com/kee-reel/ProjectManagerView.git)

**Data extentions**

DevPluginInfoDataExtention [gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git](https://gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git)

DevProjectManagerDataExtention [gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git](https://gitlab.com/kee-reel/MusicPlayerTrackDataExtention.git)
