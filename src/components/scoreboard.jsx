export function ScoreBoard({ scores }) {
    return (
        <div className='scoreboard'>
            {scores.map((item) =>
                item.name === 'curtScore' ? (
                    <p key={item.name}>Score: {item.score}</p>
                ) : (
                    <p key={item.name}>Best Score: {item.score}</p>
                ),
            )}
        </div>
    );
}
