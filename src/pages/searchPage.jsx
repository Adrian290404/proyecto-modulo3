import { PhotoComponent } from "../components/photoComponent"
import { useSelector, useDispatch } from "react-redux"
import { getSearchThunk } from "../features/searchThunk"
import { useState, useEffect } from "react"
import { searchData, searchStatus } from "../features/searchSlice"
import { useOutletContext } from "react-router-dom"
import charge from "../assets/charge.png"

export const SearchPage = () => {
    const dispatch = useDispatch()
    const photoData = useSelector(searchData) || []
    const photoStatus = useSelector(searchStatus)
    const [isLoading, setIsLoading] = useState(false)
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1000)
    const { filter } = useOutletContext()

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 1000)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        if (photoStatus === "idle") {
            dispatch(getSearchThunk());
        }
    }, [dispatch, photoStatus, filter]);

    useEffect(() => {
        switch (photoStatus) {
            case "pending":
                setIsLoading(true)
                break
            case "fulfilled":
                setIsLoading(false)
                break
            default:
                break
        }
    }, [photoStatus])

    const sortedPhotos = [...photoData].sort((a, b) => {
        switch (filter) {
            case "width":
                return b.width - a.width
            case "height":
                return b.height - a.height
            case "created_at":
                return new Date(b.created_at) - new Date(a.created_at)
            case "likes":
                return b.likes - a.likes
            default:
                return 0
        }
    })

    const [column1, column2, column3] = isWideScreen ? [[], [], []] : [sortedPhotos, [], []]
    if (isWideScreen) {
        sortedPhotos.forEach((photo, index) => {
            if (index % 3 === 0) {
                column1.push(photo)
            } else if (index % 3 === 1) {
                column2.push(photo)
            } else {
                column3.push(photo)
            }
        })
    }

    return (
    <>
        {isLoading ? (
            <div className="loading-message">
                <img className="main__charge-image" src={charge} />
            </div>
        ) : (
            <div className="main__columns-container">
                <div className="main__columns-container__column">
                    {column1.map((photo) => (
                        <section className="main__columns-container__column__image-container" key={photo.id}>
                            <PhotoComponent
                                height={photo.height}
                                width={photo.width}
                                id={photo.id}
                                likes={photo.likes}
                                publishDate={photo.created_at}
                                imageURL={photo.urls.regular}
                                description={photo.description}
                            />
                        </section>
                    ))}
                </div>
                {isWideScreen && (
                    <>
                        <div className="main__columns-container__column">
                            {column2.map((photo) => (
                                <section className="main__columns-container__column__image-container" key={photo.id}>
                                    <PhotoComponent
                                        height={photo.height}
                                        width={photo.width}
                                        id={photo.id}
                                        likes={photo.likes}
                                        publishDate={photo.created_at}
                                        imageURL={photo.urls.regular}
                                        description={photo.description}
                                    />
                                </section>
                            ))}
                        </div>
                        <div className="main__columns-container__column">
                            {column3.map((photo) => (
                                <section className="main__columns-container__column__image-container" key={photo.id}>
                                    <PhotoComponent
                                        height={photo.height}
                                        width={photo.width}
                                        id={photo.id}
                                        likes={photo.likes}
                                        publishDate={photo.created_at}
                                        imageURL={photo.urls.regular}
                                        description={photo.description}
                                    />
                                </section>
                            ))}
                        </div>
                    </>
                )}
            </div>
        )}
    </>
    )
}