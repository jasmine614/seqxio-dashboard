
import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Project Detail Page</h1>
      <p>Project ID: {id}</p>
    </div>
  );
}
