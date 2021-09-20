import {Circle} from "better-react-spinkit";

function Loading() {
    return (
        <center className="grid place-items-center h-screen">
            <div>
                <img className="h-52 mb-3" src="https://cdn.pixabay.com/photo/2015/08/03/13/58/soon-873316__480.png"></img>
                <Circle color="#3CBC28" size={60}></Circle>
            </div>

        </center>
    )
}

export default Loading
