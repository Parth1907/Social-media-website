import React, {useEffect} from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";
import {auth, db, onAuthStateChanged} from "../firebase/firebase";
import {
	query,
	where,
	collection,
	getDocs,
	addDoc,
	onSnapshot,
} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

export const AuthContext = React.createContext();
export default function AppContext({children}) {
	const collectionUsersRef = collection(db, "users");
	const provider = new GoogleAuthProvider();

	const [user, setUser] = React.useState();
	const [userData, setUserData] = React.useState();

	const navigate = useNavigate();
	
	const signInWithGoogle = async () => {
		try {
			const popup = await signInWithPopup(auth, provider);
			const user = popup.user;
			const q = query(collectionUsersRef, where("uid", "==", user.uid));
			const docs = await getDocs(q);
			if (docs.docs.length === 0) {
				await addDoc(collectionUsersRef, {
					uid: user?.uid,
					name: user?.displayName,
					email: user?.email,
					image: user?.photoURL,
					authProvider: popup?.providerId,
				});
			}
		} catch (err) {
			alert(err.message);
			console.log(err.message);
		}
	};

	const loginWithEmailAndPassword = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err) {
			alert(err.message);
			console.log(err.message);
		}
	};
	const registerWithEmailAndPassword = async (name, email, password) => {
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			const user = res.user;
			await addDoc(collectionUsersRef, {
				uid: user.uid,
				name,
				providerId: "email/password",
				email: user.email,
			});
		} catch (error) {
			alert(error.message);
			console.log(error.message);
		}
	};

	const sendPasswordToUser = async (email) => {
		try {
			await sendPasswordResetEmail(auth, email);
			alert("New passord send to your email");
		} catch (error) {
			alert(error.message);
			console.log(error.message);
		}
	};

	const signOutUser = async () => {
		await signOut(auth);
	};
	const userStateChanged = async () => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const q = query(collectionUsersRef, where("uid", "==", user.uid));
				await onSnapshot(q, (doc) => {
					setUserData(doc?.docs[0]?.data());
				});
				setUser(user);
			} else {
				setUser(null);
				navigate("/login");
			}
		});
	};
	// console.log("user",user);
	// console.log("userData",userData)
	useEffect(() => {
		userStateChanged();
		if (user || userData) {
			navigate("/");
		} else {
			navigate("/login");
		}
		return () => userStateChanged();
	}, []);
	
	const initialState = {
		signInWithGoogle: signInWithGoogle,
		loginWithEmailAndPassword: loginWithEmailAndPassword,
		registerWithEmailAndPassword: registerWithEmailAndPassword,
		sendPasswordToUser: sendPasswordToUser,
		signOutUser: signOutUser,
		user: user,
		userData: userData,
	};

	return (
		<div className="">
			<AuthContext.Provider value={initialState}>
				{children}
			</AuthContext.Provider>
		</div>
	);
}
