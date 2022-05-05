---
layout: page
title: SQL
---

<ul>
{%for post in site.posts %}
    {% if post.tag == 'sql' and post.lang == 'ru'%}
        <li>
            <h2><a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title | replace_first: "SQL. ", "" }}</a></h2>
        </li>
    {% endif %}
{% endfor %}
</ul>
