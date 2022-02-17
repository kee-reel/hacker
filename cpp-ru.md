---
layout: page
title: Язык C++
---

<ul>
{%for post in site.posts reversed %}
    {% if post.tag == 'cpp' and post.lang == 'ru'%}
        <li>
            <h3><a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title | replace_first: 'C. ', '' }}</a></h3>
        </li>
    {% endif %}
{% endfor %}
</ul>
