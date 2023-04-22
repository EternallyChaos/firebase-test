import { Auth } from "../components/auth";
import { auth, db, storage } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ref, uploadBytes } from "firebase/storage";

function Crud() {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieReleased, setIsNewMovieReleased] = useState(false);

  //update
  const [updatedTitle, setUpdatedTitle] = useState("");

  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectonRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectonRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    console.log("aas");
    try {
      await addDoc(moviesCollectonRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        hasReleased: isNewMovieReleased,
        userID: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };

  const uploadFileFunc = async () => {
    if (!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    await uploadBytes(fileFolderRef, fileUpload).catch((err) => {
      console.error(err);
    });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-red-500">Crud Page</h1>
      <div className="flex gap-20">
        <div className="flex flex-col gap-2 items-start">
          <h2>Add new item</h2>
          <label htmlFor="text">Add Title</label>
          <input
            type="text"
            placeholder="movie title"
            className="block w-full rounded border py-1 px-2"
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
          <label htmlFor="number">Add number</label>
          <input
            type="number"
            placeholder="movie release"
            className="block w-full rounded border py-1 px-2"
            onChange={(e) => setNewReleaseDate(Number(e.target.value))}
          />
          <input
            type="checkbox"
            checked={isNewMovieReleased}
            className=""
            onChange={(e) => setIsNewMovieReleased(e.target.checked)}
          />
          <label htmlFor="checkbox">Is true</label>
          <button
            className="p-1.5 border border-gray-500 rounded"
            onClick={onSubmitMovie}
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <h1>Items from Database</h1>
          {movieList.map((movie, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <h1 className="text-xl underline">Title: {movie.title}</h1>
                <p>Year Released: {movie.releaseDate}</p>
                <input
                  type="text"
                  placeholder="new title"
                  className="block w-full rounded border py-1 px-2"
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <button
                  className="p-1.5 bg-gray-200"
                  onClick={() => updateMovieTitle(movie.id)}
                >
                  Change Title
                </button>

                <p>Already released: {`${movie.hasReleased}`}</p>
                <button
                  className="bg-red-600 p-1 rounded text-white"
                  onClick={() => deleteMovie(movie.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFileFunc}>Upload File</button>
      </div> */}
    </div>
  );
}

export default Crud;
