---
layout: page
title: Проект PLAG
---

![Logo](/assets/images/PLAG-logo.png)

### PLAG (PLugin AGgregator) -- это приложение, все функции которого реализованы в плагинах.

### Пользователь может из них собрать под себя идеальное приложение, которое будет подходить именно ему.

Визуализация истории разработки:

<video width="100%" controls>
  <source src="/assets/videos/plag-gource.webm" type="video/webm">
</video>

Если интересно, то вот [статья](/plag-about-ru) с подробностями.

Можно почитать мою [статью](habr.com/ru/post/340018) про это приложение на Хабре, там я привожу больше конкретики.

Ссылка на репозиторий: [gitlab.com/kee-reel/PLAG](https://gitlab.com/kee-reel/PLAG)

Статьи для разработчков, которые хотят разработать свой плагин:

<ul>
{%for post in site.posts %}
    {% if post.tag == 'plag' and post.lang == 'ru'%}
        <li>
            <h2><a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title }}</a></h2>
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date_to_string }}</time>
            <p>{{ post.content | strip_html | truncatewords:20 }}</p>
        </li>
    {% endif %}
{% endfor %}
</ul>

