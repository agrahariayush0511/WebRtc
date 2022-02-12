import React, {useState} from 'react';
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import Button from '../../../components/shared/Button/Button'
import styles from '../StepOtp/StepOtp.module.css'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {setName} from '../../../store/activateSlice'

const StepName = ({ onNext }) => {
    const dispatch = useDispatch()
    const {name} = useSelector(state => state.activate)
    const [fullName, setFullName] = useState(name)

    const nextStep = () => {
        if(!fullName) {
            return;
        }
        
        dispatch(setName(fullName))
        onNext()
    }
    return (
        <>
                <div className={styles.cardWrapper}>
            <Card title="What's your full name?" icon="goggle-emoji">
                        <TextInput value={fullName} onChange={(e) => setFullName(e.target.value)}>
                        </TextInput>
                <p className={styles.bottomParagraph}>
                    People use real names at codershouse :) !
                </p>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={nextStep}/>
                </div>
            </Card>
            </div>
        </>
    );
};

export default StepName;
