let currentScanner = null;

window.startQrScanner = function () {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Ваш браузер не поддерживает камеру :(");
        return;
    }

    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
            html5QrCode.stop();
            currentScanner = null;
            window.location.href = decodedText;
        },
        (error) => {
            console.log(error);
        }
    ).catch(err => {
        alert("Ошибка камеры: " + err);
    });

    currentScanner = html5QrCode;
};

window.stopQrScanner = function () {
    return new Promise((resolve) => {
        if (currentScanner) {
            currentScanner.stop().then(() => {
                currentScanner = null;
                resolve();
            }).catch(() => {
                resolve();
            });
        } else {
            resolve();
        }
    });
};