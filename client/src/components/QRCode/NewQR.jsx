import React, { memo, useContext, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { assests } from "../../assets/assests";
import { storeContext } from "../../Context/StoreContext";
import { toPng } from 'html-to-image';

const QRCodeComponent = () => {
    const qrRef = useRef(null);
    const qrImage = useRef(null);
    const { URL, token, userData } = useContext(storeContext);

    useEffect(() => {
        if (userData) {
            const qrCode = new QRCodeStyling({

                width: 300,
                height: 300,
                data: `https://affiliaterishtpusht.netlify.app/referpatient/${userData._id}`,
                margin: 3,
                qrOptions: {
                    typeNumber: "0",
                    mode: "Byte",
                    errorCorrectionLevel: "Q"
                },
                imageOptions: {
                    hideBackgroundDots: true,
                    imageSize: 0.4,
                    margin: 0
                },
                image: assests.qrlogo,
                dotsOptions: {
                    type: "extra-rounded",
                    color: "#6a1a4c",
                    gradient: {
                        type: "linear",
                        rotation: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: "#396e2b"
                            },
                            {
                                "offset": 1,
                                "color": "#1b6600"
                            }
                        ]
                    }
                },
                backgroundOptions: {
                    color: "#ffffff",
                    gradient: null
                },
                dotsOptionsHelper: {
                    colorType: {
                        single: true,
                        gradient: false
                    },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: "#6a1a4c",
                        color2: "#6a1a4c",
                        rotation: 0
                    }
                },
                cornersSquareOption: {
                    typ: "extra-rounded",
                    colo: "#000000",
                    gradien: {
                        typ: "linear",
                        rotatio: 0,
                        colorStop: [
                            {
                                offset: 0,
                                color: "#13581e"
                            },
                            {
                                offset: 1,
                                color: "#365912"
                            }
                        ]
                    }
                },
                cornersSquareOptionsHelper: {
                    colorType: {
                        single: true,
                        gradient: false
                    },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: "#000000",
                        color2: "#000000",
                        rotation: 0
                    }
                },
                cornersDotOptions: {
                    type: "",
                    color: "#225407"
                },
                cornersDotOptionsHelper: {
                    colorType: {
                        single: true,
                        gradient: false
                    },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: "#000000",
                        color2: "#000000",
                        rotation: 0
                    }
                },
                backgroundOptionsHelper: {
                    colorType: {
                        single: true,
                        gradient: false
                    },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: "#ffffff",
                        color2: "#ffffff",
                        rotation: 0
                    }
                }

            });

            qrCode.append(qrRef.current);

            // To trigger the download after rendering
            // qrCode.download({ name: "qr", extension: "svg" });

            // Clean up the QR code on component unmount
            // return () => {
            //     qrRef.current.innerHTML = "";
            // };
        }
    }, [userData]);

    const htmlToImageConvert = () => {
        toPng(qrImage.current, { cacheBust: false })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "my-image-name.png";
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        <>
            <div>
                <div ref={qrImage}>
                    <div ref={qrRef} />
                </div>
                <button className='text-center px-4 py-2 my-4 bg-[#3e454b] hover:bg-[#081b2b] text-white border-2 border-solid border-white rounded-md' onClick={htmlToImageConvert}>QR Code Download</button>

            </div>
        </>
    )
};

export default memo(QRCodeComponent);
