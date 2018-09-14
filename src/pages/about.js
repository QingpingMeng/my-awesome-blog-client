import React from 'react';
import 'github-markdown-css';

export default () => {
    return (
        <div style={{ textAlign: 'center' }} className="markdown-body">
            <hr />
            <p>
                Hello, My name is Qingping Meng. I am a software engineer at
                Microsoft now.
            </p>
            <p>
                I will share some take-aways learned from my web development
                journey.
            </p>
            <p>
                Feel free to leave your feedback or report issues at my GitHub
                repo.
            </p>
            <hr />
            <p>
                <a style={{marginRight: '0.5rem'}} target="_about" href="https://github.com/QingpingMeng">
                    <img
                        alt="github"
                        height={32}
                        width={32}
                        src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
                    />
                </a>
                <a target="_about" href="https://www.linkedin.com/in/qingping-meng-2a648768/">
                    <img
                        alt="linkedin"
                        height={32}
                        width={32}
                        src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg"
                    />
                </a>
            </p>
        </div>
    );
};
