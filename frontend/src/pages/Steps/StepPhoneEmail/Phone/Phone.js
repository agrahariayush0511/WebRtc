import React, {useState} from 'react'
import Card from '../../../../components/shared/Card/Card'
import Button from '../../../../components/shared/Button/Button'
import styles from '../StepPhoneEmail.module.css'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import {sendOtp} from '../../../../http'
import {useDispatch} from 'react-redux'
import {setOtp} from '../../../../store/authSlice'

const Phone = ({onNext}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const dispatch = useDispatch();
    const submit = async () => {

        //* server request----------
        //* -----------------------

        const {data} = await sendOtp({phone: phoneNumber})
        console.log(data)
        dispatch(setOtp({phone: data.phone, hash: data.hash}))
        onNext()
    }
    return (
        <>
              <Card title="Enter your phone number" icon="phone">
                        <TextInput value={phoneNumber}
                        onChange={(e)=> setPhoneNumber(e.target.value)}
                        >
                        </TextInput>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit} />
                </div>

                <p className={styles.bottomParagraph}>
                    By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks!
                </p>
            </Card>

        </>
    )
}

export default Phone
