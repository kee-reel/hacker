sed -i "s/Temperature:.*/Temperature: $(temperature | cut -d= -f2)/" _includes/footer.html
sed -i "s/Uptime:.*/Uptime: $(uptime -p | sed 's/up //')/" _includes/footer.html
sudo bundle3.0 exec jekyll b --incremental
