python app.py &
sleep 5
curl -G "http://localhost:5000/getPhoto" --data-urlencode "path=home/ldedivitiis/IQON3000-sample/1220149/3444971/8746680_m.jpg" -o downloaded_image.jpg
pkill -f "python app.py"
lsof -i:5000