import deathStar from "../assets/death-star.png";
import styles from "./Loader.module.scss";

export const Loader = () => <img className={styles.loader} src={deathStar} alt="death-star loader"></img>;