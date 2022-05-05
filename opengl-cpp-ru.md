---
layout: page
title: OpenGL на языке C++
---

<ul>
{%for post in site.posts %}
    {% if post.tag == 'opengl-cpp' and post.lang == 'ru'%}
        <li>
            <h2><a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title | replace_first: "OpenGL/C++. ", "" }}</a></h2>
        </li>
    {% endif %}
{% endfor %}
</ul>
