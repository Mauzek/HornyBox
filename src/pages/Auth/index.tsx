import { AuthForm } from '../../components'
import styles from './Auth.module.scss';

export const AuthPage = () => {
    document.title = "Вход - HornyBox"
  return (
    <section className={styles.page}>
      <AuthForm/>
    </section>
  )
}
