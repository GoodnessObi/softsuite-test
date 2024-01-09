import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';
import './ProgressBar.scss';

const Progress = ({ page }: { page: number }) => {
	let progress = 0;

	if (page === 1) {
		progress = 33;
	} else if (page === 2) {
		progress = 66;
	} else if (page === 3) {
		progress = 100;
	}

	return (
		<ProgressBar percent={progress}>
			<Step>
				{({ accomplished, index }) => (
					<div
						className={`indexedStep-link-1 ${
							accomplished ? 'accomplished' : null
						}`}
					>
						{index + 1}
					</div>
				)}
			</Step>
			<Step>
				{({ accomplished, index }) => (
					<div
						className={`indexedStep-link-2 ${
							accomplished ? 'accomplished' : null
						}`}
					>
						{index + 1}
					</div>
				)}
			</Step>
			<Step>
				{({ accomplished, index }) => (
					<div
						className={`indexedStep-link-3  ${
							accomplished ? 'accomplished' : null
						}`}
					>
						{index + 1}
					</div>
				)}
			</Step>
		</ProgressBar>
	);
};

export default Progress;
