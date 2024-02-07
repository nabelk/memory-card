import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function Instruction() {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <button onClick={onOpenModal}>
                <img src='/svg/hint.svg' alt='instruction' />
            </button>
            <Modal
                open={open}
                onClose={onCloseModal}
                center
                classNames={{
                    modal: 'customModal',
                }}
            >
                <h2>How to play?</h2>
                <p>
                    Score points by selecting cards, but ensure not to choose the same card twice!
                </p>
            </Modal>
        </div>
    );
}
