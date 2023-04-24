import styles from "@/styles/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.center}>
      <div className={styles.ring}></div>
      <span>
        Transaction <br /> Has Been Sending...
      </span>
    </div>
  );
}
