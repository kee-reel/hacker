---
layout: page
title: Язык Python
---

<ul>
{%for post in site.posts %}
    {% if post.tag == 'python' and post.lang == 'ru' %}
        <li>
            <h2><a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title | replace_first: "Python. ", "" }}</a></h2>
        </li>
    {% endif %}
{% endfor %}
</ul>
