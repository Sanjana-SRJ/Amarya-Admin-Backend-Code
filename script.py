from ultralytics import YOLO
import cv2
import math
import base64
import time
import socketio
import os
from threading import Thread

print("Python script has started running")
environment = os.getenv('NODE_ENV', 'development')

# Set the server URL based on the environment
if environment == 'production':
    server_url = os.getenv('PROD_SERVER_URL')
else:
    server_url = os.getenv('LOCAL_SERVER_URL')

# Set up a client to connect to the Node.js WebSocket server
sio = socketio.Client()

@sio.event
def connect():
    print("Connected to Node.js server")

@sio.event
def disconnect():
    print("Disconnected from Node.js server")

# List of RTSP streams
rtsp_streams = [
    "rtsp://192.168.1.28:5543/c09aa8be6a70054108fb66336c2b82c9/live/channel0",
    0  # This assumes 0 is your webcam
]

# Load the YOLO model
model = YOLO("./best.pt")

classNames = [
    'AnkitK', 'Anuj', 'Depanshu', 'Divij', 'Eish', 'Itesh', 'Kishan', 'Lucky',
    'Prabal', 'Prashant', 'Pujita', 'Tamanna', 'Sanjana', 'ShubhamK', 'ShubhamS',
    'Surya', 'Vshwabhushan', 'Yogesh'
]

def object_detection(img):
    detections = []
    results = model(img, stream=True)

    for r in results:
        boxes = r.boxes
        for box in boxes:
            # Bounding box
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # Convert to int values
            cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)

            # Confidence and class name
            confidence = round(box.conf[0].item(), 2)  # Convert tensor to float and round
            cls = int(box.cls[0])
            class_name = classNames[cls]
            _, buffer = cv2.imencode('.jpg', img)
            frame_data = base64.b64encode(buffer).decode('utf-8')

            detections.append({
                "class_name": class_name,
                "confidence": confidence,
                "bounding_box": {"x1": x1, "y1": y1, "x2": x2, "y2": y2},
                "image": frame_data
            })

            # Draw label
            cv2.putText(img, class_name, (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

    return img, detections

def process_stream(rtsp_url, stream_id):
    print(f"Processing stream {stream_id}: {rtsp_url}")
    cap = None

    try:
        cap = cv2.VideoCapture(rtsp_url) if rtsp_url != 0 else cv2.VideoCapture(rtsp_url, cv2.CAP_DSHOW)
        cap.set(cv2.CAP_PROP_BUFFERSIZE, 10)

        while True:
            ret, frame = cap.read()
            if not ret:
                print(f"Failed to capture frame from stream {stream_id}. Reconnecting...")
                cap.release()
                time.sleep(2)
                cap.open(rtsp_url)
                continue

            frame, detections = object_detection(frame)
            if detections:
                sio.emit('detections', {
                    'detections': detections,
                    'rtsp_url': rtsp_url,
                    'stream_id': stream_id
                })

            # Display the frame in a separate window for each stream
            window_name = f"Stream {stream_id}"
            cv2.imshow(window_name, frame)

            # Add a small delay and break if the user presses the 'q' key
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    except Exception as e:
        print(f"Error processing stream {stream_id}: {e}")
        time.sleep(5)  # Brief pause before retrying
    finally:
        if cap is not None:
            cap.release()
        cv2.destroyAllWindows()

def start_streams():
    print("Starting streams")
    threads = []
    for i, rtsp_url in enumerate(rtsp_streams):
        thread = Thread(target=process_stream, args=(rtsp_url, i))
        thread.daemon = True  # Ensure threads exit with the main program
        threads.append(thread)
        thread.start()

if __name__ == '__main__':
    # Connect to the Node.js server
    try:
        sio.connect(server_url)
    except Exception as e:
        print(f"Error connecting to Node.js server: {e}")

    # Start processing streams
    start_streams()

    # Keep the script running
    while True:
        time.sleep(1)
