document.addEventListener('DOMContentLoaded', function () {
    const imgsArray = [
        {
            img: '../assets/images/img1.jpg',
        },
        {
            img: '../assets/images/img2.jpg',
        },
        {
            img: '../assets/images/img3.jpg',
        },
        {
            img: '../assets/images/img4.jpg',
        },
        {
            img: '../assets/images/img5.jpg',
        },
        {
            img: '../assets/images/img6.jpg',
        },
        {
            img: '../assets/images/img7.jpg',
        },
        {
            img: '../assets/images/img8.jpg',
        },
        {
            img: '../assets/images/img9.jpg',
        },
        {
            img: '../assets/images/img10.jpg',
        },
        {
            img: '../assets/images/img11.jpg',
        },
        {
            img: '../assets/images/img12.jpg',
        },
    ]

    let limit = 9

    const imagesDiv = document.querySelector('.images')

    function renderImages() {
        imagesDiv.innerHTML = imgsArray.slice(0, limit).map((img, index) => {
            return `
                <div class="image relative cursor-pointer" key="${img.img}">
                    <img src="${img.img}" alt="img-${index}">
                    <div class="img-overlay absolute bottom-0 left-0 w-full h-[50%]">
                        <p class="text-[#efefef] text-[14px] sm:text-[16px] font-light absolute bottom-[8%] right-[6%]">
                            Click To View <i class='bx bx-right-arrow-alt mt-2 text-[#efefef]'></i></p>
                    </div>
                </div>
            `
        }).join('')

        animateImages()
    }

    function animateImages() {
        const images = document.querySelectorAll('.image')

        images.forEach((image, index) => {
            gsap.from(image, {
                scale: 0.8,
                rotate: index % 2 == 0 ? 10 : -10,
                opacity: 0,
                duration: 1,
                delay: index * 0.5,
                scrollTrigger: {
                    trigger: image,
                    start: 'top 80%',
                    end: '+=300px',
                    scrub: 1,
                }
            })
        })
    }

    renderImages()

    document.querySelector('.load-more-btn').addEventListener('click', () => {
        limit += 3

        if (limit >= imgsArray.length) {
            document.querySelector('.load-more-btn').style.display = 'none'
        }

        renderImages()

        setTimeout(() => {
            window.scrollBy({
                top: 300,
                behavior: 'smooth'
            })
        }, 100);

        openModalSrc()
    })

    const modal = document.querySelector('.modal')
    const modalClose = document.querySelector('.modal-close')
    const modalImg = document.querySelector('.modal-img img')
    const modalContent = document.querySelector('.modal-content')
    const downloadBtn = document.querySelector('.download-btn a')

    function openModalSrc() {
        const images = document.querySelectorAll('.image')

        images.forEach((image) => {
            image.addEventListener('click', () => {
                openModal(image.querySelector('img').src)
            })
        })
    }

    openModalSrc()

    let windowWidth = window.innerWidth

    const modalTl = gsap.timeline()


    function openModal(imgSrc) {
        modalTl.to(modal, {
            display: 'flex',
            opacity: 1,
            duration: 0.3,
        })

        modalTl.to(modalContent, {
            width: windowWidth > 499 ? '80%' : '90%',
            duration: 0.3,
        })

        modalImg.style.opacity = 0
        downloadBtn.href = imgSrc
        
        setTimeout(() => {
            modalImg.src = imgSrc
            modalImg.style.transition = 'opacity 0.1s linear'
            modalImg.style.opacity = 1
        }, 600);
    }

    function closeModal() {
        modalTl.to(modalContent, {
            width: '0%',
            duration: 0.3,
        })
        modalTl.to(modal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                modal.style.display = 'none'
            }
        })
    }

    modalClose.addEventListener('click', () => {
        closeModal()
    })

    const tl = gsap.timeline()

    tl.from('.cover-content span h1', {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
    })

    tl.from('.cover-content span p', {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: -0.5,
    })

    tl.from('.cover-img-1', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'back.out',
    })

    tl.from('.cover-img-2', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        delay: -0.5,
        ease: 'back.out',
    })

    tl.from('.cover-img-3', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        delay: -0.5,
        ease: 'back.out',
    })

    gsap.to('.scroll-down', {
        y: -20,
        opacity: 1,
        duration: 1,
        delay: 2,
        yoyo: true,
        repeat: -1,
    })

    gsap.from(".image-gallery h1", {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".image-gallery h1",
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
        }
    })
})