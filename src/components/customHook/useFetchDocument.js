import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { database } from "../../firebase/config";

const useFetchDocument = (orderId) => {
	const [document, setDocument] = useState([]);

	const getOrder = async () => {
		try {
			const orderRef = doc(database, "orders", orderId);
			const docSnap = await getDoc(orderRef);
			if (docSnap.exists()) {
				setDocument(() => docSnap.data());
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	useEffect(() => {
		getOrder();
	}, []);

	return { document };
};

export default useFetchDocument;
