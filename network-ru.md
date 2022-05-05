---
layout: page
title: Компьютерные сети
---

<ul>
{%for post in site.posts %}
    {% if post.tag == 'network' and post.lang == 'ru'%}
        <li>
            <h2><a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title }}</a></h2>
        </li>
    {% endif %}
{% endfor %}
</ul>
