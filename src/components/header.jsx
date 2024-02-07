import Instruction from './instruction';
import { ScoreBoard } from './scoreboard';

export function Header({ scores }) {
    return (
        <header>
            <div className='logo'>
                <h3>
                    Money <span>Heist</span>
                </h3>
            </div>
            <div>
                <Instruction></Instruction>
                <a href='https://github.com/nabelk'>
                    <button title='Check my github profile'>
                        <img src='/svg/github-logo.svg' alt='github logo' />
                    </button>
                </a>
                <ScoreBoard scores={scores}></ScoreBoard>
            </div>
        </header>
    );
}
