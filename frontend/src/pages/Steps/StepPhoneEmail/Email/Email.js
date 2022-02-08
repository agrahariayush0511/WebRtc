import React, {useState} from 'react'
import Card from '../../../../components/shared/Card/Card'
import Button from '../../../../components/shared/Button/Button'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'


const Email = ({onNext}) => {

    const [email, setEmail] = useState('')
    return (
        <>
                    <Card title="Welcome to Codershouse!" icon="email-emoji">
                        <TextInput value={email} onChange={(e) => setEmail(e.target.value)}>
                        </TextInput>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={onNext} />
                </div>

                <p className={styles.bottomParagraph}>
                    By entering your email, you're agreeing to our Terms of Service and Privacy Policy. Thanks!
                </p>
            </Card> 

        </>
    )
}

export default Email