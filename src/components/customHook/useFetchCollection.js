import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { database } from "../../firebase/config";

const useFetchCollection = (collectionName) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getProdcuts = () => {
		setIsLoading(true);
		try {
			const docRef = collection(database, collectionName);
			const q = query(docRef, orderBy("createdAt", "desc"));

			onSnapshot(q, (snapshot) => {
				const allData = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setData(allData);
				setIsLoading(false);
			});
		} catch (error) {
			toast.error(error.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getProdcuts();
	}, []);

	return { data, isLoading };
};

export default useFetchCollection;
