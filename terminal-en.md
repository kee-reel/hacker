---
layout: default-en
title: Работа в терминале
---

<ul>
{%for post in site.posts %}
    {% if post.tag == 'terminal' and post.lang == 'en' %}
        <li>
            <h2><a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title }}</a></h2>
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date_to_string }}</time>
            <p>{{ post.content | strip_html | truncatewords:20 }}</p>
        </li>
    {% endif %}
{% endfor %}
</ul>
