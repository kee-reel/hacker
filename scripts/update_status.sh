echo "{\"uptime\": \"$(uptime -p | sed 's/^up //')\", \"temperature\": $(cat /sys/class/thermal/thermal_zone0/temp | grep -oE '^..')}" > data/status.json
