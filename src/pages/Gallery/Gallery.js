import React, { useCallback, useEffect, useState } from "react";
import { Modal, } from "reactstrap";
import { toast } from 'react-toastify';
import galleryServices from "../../services/gallery.services";
import GalleryForm from "../../components/Gallery/GalleryForm";
import GalleryList from "../../components/Gallery/GalleryList";
import ImageViewer from 'react-simple-image-viewer';
const Gallery = () => {
    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal);
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState();
    const [isAddMode, setIsAddMode] = useState('Add');
    const [isShowGallery, setIsShowGallery] = useState(false)
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [images, setImages] = useState([]);
    // const images = [
    //     'http://placeimg.com/1200/800/nature',
    //     'http://placeimg.com/800/1200/nature',
    //     'http://placeimg.com/1920/1080/nature',
    //     'http://placeimg.com/1500/500/nature',
    //     'http://placeimg.com/800/1200/nature',
    //     'http://placeimg.com/1920/1080/nature',
    //     'http://placeimg.com/1500/500/nature',
    //     'http://placeimg.com/800/1200/nature',
    //     'http://placeimg.com/1920/1080/nature',
    //     'http://placeimg.com/1500/500/nature',
    //     'http://placeimg.com/800/1200/nature',
    //     'http://placeimg.com/1920/1080/nature',
    //     'http://placeimg.com/1500/500/nature',
    // ];

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };
    const openGallery= () =>  setIsShowGallery(!isShowGallery);

    const getData = () => {
        const result = galleryServices.listApi()
            .then((res) => {
                if (res.data.status === true) {
                    setData(res.data.data)
                    // const imgArry = []
                    // for (let index = 0; index < res.data.data.length; index++) {
                    //     const element = res.data.data[index];
                    //     imgArry.push(element.imgUrl)
                    // }
                    const img = res.data.data.map((item)=>{
                        return item.imgUrl
                    })
                    setImages(img)
                }
            }).catch((error) => {
                console.log('error', error)
            })
    }

    const deleteById = async (id) => {
        const result = await galleryServices.deleteApi({ id: id });
        if (result.data.status === true) {
            toast.success('Record deleted successfully', { toastId: 'userDelete_success', autoClose: 3000 });
            getData();
        } else {
            toast.error(result.data.message, { toastId: 'userDelete_faild', autoClose: 3000 });
        }
    }

    const handleChangeStatus = async (id, status) => {
        const result = await galleryServices.updateStatusApi(id, { status: status })
        if (result.data.status === true) {
            getData()
            toast.success('Status updated successfully', { toastId: 'update_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'update_fail', autoClose: 3000 });
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <React.Fragment>
            {/*page-wrapper*/}
            <div className="page-wrapper">
                {/*page-content-wrapper*/}
                <div className="page-content-wrapper">
                    <div className="page-content">
                        <>
                            {/*breadcrumb*/}
                            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                                <div className="breadcrumb-title pe-3">Gallery</div>
                                <div className="ps-3">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb mb-0 p-0">
                                            <li className="breadcrumb-item">
                                                <a href="#">
                                                    <i className="bx bx-home-alt" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                Gallery
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                                <div className="ms-auto">
                                    <div className="btn-group">
                                        <button className="btn btn-secondary"
                                            onClick={() => {
                                                openGallery()
                                            }}><i className="bx bx plus" />{isShowGallery===true?'Close Gallery':'Show Gallery'}</button>
                                        {isShowGallery === false &&(<button className="btn btn-primary"
                                            onClick={() => {
                                                toggle();
                                                setIsAddMode('Add')
                                            }}><i className="bx bx plus" />Add</button> )}
                                        <Modal isOpen={modal} toggle={toggle} size="lg">
                                            <GalleryForm toggle={toggle} isAddMode={isAddMode} getData={getData} selectedRow={selectedRow} />
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                            {/*end breadcrumb*/}
                            {isShowGallery === false && (<div className="card">
                                <div className="card-body">
                                    <div className="card-title">
                                        {/* <h4 className="mb-0">Users</h4> */}
                                    </div>
                                    <hr />
                                    <GalleryList
                                        tblData={data}
                                        setIsAddMode={setIsAddMode}
                                        setSelectedRow={setSelectedRow}
                                        setModal={setModal}
                                        deleteById={deleteById}
                                        getData={getData}
                                        handleChangeStatus={handleChangeStatus}
                                    />
                                </div>
                            </div>
                            )}
                           {isShowGallery &&( <div className="gallery_row">
                                {images.map((src, index) => (
                                    <img
                                        src={src}
                                        onClick={() => openImageViewer(index)}
                                        width={250}
                                        height={250}
                                        key={index}
                                        style={{ margin: '2px' }}
                                        alt=""
                                    />
                                ))}

                                {isViewerOpen && (
                                    <ImageViewer
                                        src={images}
                                        currentIndex={currentImage}
                                        disableScroll={false}
                                        closeOnClickOutside={true}
                                        onClose={closeImageViewer}
                                    />
                                )}
                            </div>)}
                        </>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Gallery;