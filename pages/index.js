import Head from "next/head";
import Header from "../components/Header";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import { getSession, useSession } from "next-auth/client";
import Login from "../components/Login";
import Modal from "@material-tailwind/react/Modal";
import Modalbody from "@material-tailwind/react/Modalbody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { useCollection, } from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";
export default function Home() {
  const [session] = useSession();

  if (!session) return <Login />;
    const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [snapshot] = useCollection(db.collection("userDocs").doc(session.user.email).collection('docs').orderBy('timeStamp', 'desc'));
  const createDocument = () => {
    if (!input) return;
    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      fileName: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setShowModal(false);
  };
  
  const modal = (
    
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <Modalbody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)} //as user type
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </Modalbody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}
      <section className="bg-[#F8F9FA]  pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-gray-700">Start a new document</h2>
            <Button
              color="gray"
              ripple="dark"
              buttonType="outline"
              iconOnly={true}
              className="border-0"
              rounded={true}
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 cursor-pointer border-2 hover:border-blue-400"
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="flex-grow font-bold">My Documents</h2>
            <p className="mr-12">Date created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
          {console.log(snapshot)}
          {snapshot?.docs?.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timeStamp}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
