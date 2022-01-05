sed -i "s/Temperature:.*/Temperature: $(~/bin/temperature | cut -d= -f2)/" _includes/footer.html
sed -i "s/Uptime:.*/Uptime: $(uptime -p | sed 's/up //')/" _includes/footer.html
bundle exec jekyll b --incremental
