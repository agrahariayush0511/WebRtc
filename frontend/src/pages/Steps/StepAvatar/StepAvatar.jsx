import React, {useState, useEffect} from 'react';
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Button/Button'
import styles from './StepAvatar.module.css'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {setName} from '../../../store/activateSlice'
import {setAuth} from '../../../store/authSlice'
import {setAvatar} from '../../../store/activateSlice'
import {activate} from '../../../http'
import Loader from '../../../components/shared/Loader/Loader';

const StepName = ({ onNext }) => {
    const [image, setImage] = useState('./images/monkey-avatar.png')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    // * Retrieving data from-------------
    // * state----------
    const {name, avatar} = useSelector(state => state.activate)
    const {user} = useSelector(state => state.auth)

    useEffect(() => {
        setImage(avatar)
    }, [])

    // * Setting image-------------
    // * ----------
    
    const captureImage = (e) => {
        // setImage(avatar)
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result)
            // console.log(reader.result)
            dispatch(setAvatar(reader.result))
        }
    }

    // * connecting to server-------------
    // * for activation ----------

    const submit = async () => {
        setLoading(true)
        try {
            const {data} = await activate({name, avatar})
            const userDto = data
            console.log(userDto)
            console.log(data)
            if(data.auth) {
                dispatch(setAuth(userDto));
            }
        }
        catch(err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    if(loading) return <Loader message="Activation in Progress..."/>
    return (
        <>
                <div className={styles.cardWrapper}>
            <Card title={`Okay, ${name}`} icon="monkey-emoji">
                <p className={styles.bottomParagraph}>
                    How's this photo?
                </p>
                <div className={styles.avatarWrapper}>
                <label htmlFor="avatarInput">
                    <img src={image} alt="avatar" className={styles.avatarImage}/>
                    </label>
                </div>
                <div>
                    <input 
                    onChange={captureImage}
                    type="file" 
                    id="avatarInput" 
                    className={styles.avatarInput} />
                    <label htmlFor="avatarInput" className={styles.avatarLabel}>
                        Choose a different photo
                    </label>
                </div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit}/>
                </div>
            </Card>
            </div>
        </>
    );
};

export default StepName;