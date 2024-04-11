import LockImage from '@workshop_assignment/cloudlock.png';
import UnlockImage from '@workshop_assignment/cloudunlock.png';


const IconLock = ({ lock, lockWord }: { lock: boolean, lockWord: Function }) => {
    return <img
        src={lock ? LockImage : UnlockImage}
        alt={lock ? 'Locked' : 'Unlocked'}
        className="lock-icon"
        onClick={(e) => {
            e.stopPropagation();
            lockWord()
        }}
    />;
};

export default IconLock;