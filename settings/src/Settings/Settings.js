import {in_array} from '../utils/lib';
import SettingsGroup from './SettingsGroup';
import Help from './Help';
import {useState, useEffect} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import useFields from '../Settings/Fields/FieldsData';
import useMenu from '../Menu/MenuData';
import {UseMenuData} from './DocumentsMenu/MenuData';
import UseBannerData from './CookieBannerPreview/CookieBannerData';
import useProgress from '../Dashboard/Progress/ProgressData';
import SettingsPlaceholder from '../Placeholder/SettingsPlaceholder';

/**
 * Renders the selected settings
 *
 */
const Settings = () => {
	const [noticesExpanded, setNoticesExpanded] = useState(true);
	const {progressLoaded, notices, fetchProgressData} = useProgress();
	const [isExploding, setIsExploding] = useState(false);
	const {saveBanner, setBannerDataLoaded} = UseBannerData();
	const {saveDocumentsMenu} = UseMenuData();
	const [CookieBannerPreview, setCookieBannerPreview] = useState(null);
	const [ConfettiExplosion, setConfettiExplosion] = useState(null);
	const {
		getFieldNotices,
		fieldNotices,
		fieldNoticesLoaded,
		fieldsLoaded,
		saveFields,
		changedFields,
		fields,
		fetchAllFieldsCompleted,
		nextButtonDisabled,
	} = useFields();
	const {
		subMenuLoaded,
		saveButtonsRequired,
		subMenu,
		selectedSubMenuItem,
		selectedMainMenuItem,
		nextMenuItem,
		previousMenuItem,
	} = useMenu();

	useEffect(() => {
		if (selectedMainMenuItem === 'banner' && !CookieBannerPreview) {
			import ( './CookieBannerPreview/CookieBannerPreview').then(
				({default: CookieBannerPreview}) => {
					setCookieBannerPreview(() => CookieBannerPreview);
				});
		}
	}, [selectedMainMenuItem]);
	useEffect(() => {
		if (selectedSubMenuItem === 'finish' && !ConfettiExplosion) {
			import ( "react-confetti-explosion").then(
				({default: ConfettiExplosion}) => {
					setConfettiExplosion(() => ConfettiExplosion);
				});
		}
	}, [selectedSubMenuItem]);
	useEffect(() => {
		getFieldNotices();
		fetchAllFieldsCompleted();
	}, [fields]);

	const toggleNotices = () => {
		setNoticesExpanded(!noticesExpanded);
	};

	const finish = () => {
		if (nextButtonDisabled) return;
		setIsExploding(true);
		//wait 2 seconds, then run saveData
		setTimeout(() => {
			saveData(true, false);
			setIsExploding(false);
		}, 2200);
	}

	const saveData = async (finish, showNotice) => {
		const regionIndex = changedFields.findIndex(field => {
			return field.id === 'regions';
		});
		if (regionIndex !== -1) {
			//if the region field is changed, we need to update the banner
			setBannerDataLoaded(false);
		}
		if (selectedSubMenuItem === 'document-menu') {
			await saveFields(selectedSubMenuItem, showNotice, false);
			await saveDocumentsMenu(changedFields.length > 0, showNotice);
		} else if (selectedMainMenuItem === 'banner') {
			await saveBanner(fields);
		} else {
			await saveFields(selectedSubMenuItem, showNotice, finish);
			await fetchProgressData();
		}
	};

	const {menu_items: menuItems} = subMenu;
	if (!subMenuLoaded || !fieldsLoaded || menuItems.length === 0) {
		return (
			<SettingsPlaceholder/>
		);
	}
	let selectedFields = fields.filter(
		field => field.menu_id === selectedSubMenuItem);
	let groups = [];
	for (const selectedField of selectedFields) {
		if (!in_array(selectedField.group_id, groups)) {
			groups.push(selectedField.group_id);
		}
	}
	let helpNotices = [];

	//add some notices conditionally for fields
	if (fieldNoticesLoaded) {
		for (const fieldNotice of fieldNotices) {
			let noticeFields = selectedFields.filter(
				field => fieldNotice.field_id === field.id);
			if (noticeFields.length > 0) {
				helpNotices.push(fieldNotice);
			}
		}
	}

	//convert progress notices to an array useful for the help blocks
	if (progressLoaded) {
		for (const notice of notices) {
			let noticeIsLinkedToField = false;

			//notices that are linked to a field. Only in case of warnings.
			if (notice.show_with_options && notice.status === 'warning') {
				let noticeFields = selectedFields.filter(
					field => notice.show_with_options.includes(field.id));
				noticeIsLinkedToField = noticeFields.length > 0;
			}
			//notices that are linked to a menu id.
			if (noticeIsLinkedToField || notice.menu_id === selectedSubMenuItem) {
				let help = {};
				help.title = notice.title ? notice.title : false;
				help.label = notice.label;
				help.id = notice.id;
				help.text = notice.message;
				help.url = notice.url;
				help.linked_field = notice.show_with_option;
				helpNotices.push(help);
			}
		}
	}

	//help items belonging to a field
	//if field is hidden, hide the notice as well
	for (const notice of selectedFields.filter(
		field => field.help && !field.conditionallyDisabled)) {
		let help = notice.help;
		//check if the notices array already includes this help item
		//this can happen in case of dynamic fields, like details per purpose
		let existingNotices = helpNotices.filter(
			noticeItem => noticeItem.id && noticeItem.id === help.id);
		if (existingNotices.length === 0) {
			helpNotices.push(notice.help);
		}
	}
	helpNotices = helpNotices.filter(
		notice => notice.label.toLowerCase() !== 'completed');
	let cookiebannerEnabled = fields.filter(
		field => field.id === 'enable_cookie_banner' && field.value ===
			'yes').length > 0;
	let continueLink = nextButtonDisabled ? `#${selectedMainMenuItem}/${selectedSubMenuItem}` : nextMenuItem;
	let finishLink = cookiebannerEnabled ? `#banner` : `#dashboard`;
	finishLink = nextButtonDisabled ? `#${selectedMainMenuItem}/${selectedSubMenuItem}` : finishLink;
	return (
		<>
			{isExploding && ConfettiExplosion && <div className="cmplz-confetti"><ConfettiExplosion zIndex={999999}/></div>}
			<div className="cmplz-wizard-settings cmplz-column-2">
				{groups.map((group, i) =>
					<SettingsGroup key={i} index={i} group={group}
												 fields={selectedFields}/>)
				}
				<div className="cmplz-grid-item-footer-container">
					<ScrollProgress/>
					<div className="cmplz-grid-item-footer">
						{selectedMainMenuItem !== 'wizard' &&
							<div className="cmplz-grid-item-footer-upsell-bar">
								{!cmplz_settings.is_premium &&
									<a className="button button-default"
										 href="https://complianz.io/pricing"
										 target="_blank">{__(
										'Get Premium', 'complianz-gdpr')}</a>}
							</div>}
						<div className={'cmplz-grid-item-footer-buttons'}>
							{/*This will be shown only if current step is not the first one*/}
							{previousMenuItem !== '#' &&
								<a href={previousMenuItem} onClick={() => {
									window.scrollTo({
										top: 0,
										behavior: 'smooth',
									});
								}}>
									{__('Previous', 'complianz-gdpr')}
								</a>
							}
							{saveButtonsRequired() &&
								<button
									className="button button-default"
									onClick={(e) => saveData(false, true)}>
									{__('Save', 'complianz-gdpr')}
								</button>
							}
							{/*This will be shown only if current step is not the last one*/}
							{selectedSubMenuItem !== menuItems[menuItems.length - 1].id &&
								<>
									{saveButtonsRequired() &&
										<a disabled={nextButtonDisabled}
											 className="button button-primary" href={continueLink}
											 onClick={(e) => {
												 saveData(false, false)
												 // smooth scroll to top
												 window.scrollTo({
													 top: 0,
													 behavior: 'smooth',
												 });
											 }}>
											{__('Save and Continue', 'complianz-gdpr')}
										</a>
									}
									{!saveButtonsRequired() &&
										<a className="button button-primary" href={continueLink}
											 onClick={(e) => saveData(false, false)}>
											{__('Continue', 'complianz-gdpr')}
										</a>
									}
								</>
							}

							{selectedMainMenuItem === 'wizard' && selectedSubMenuItem ===
								menuItems[menuItems.length - 1].id &&
								<a disabled={nextButtonDisabled }
									 className="button button-primary" href={finishLink}
									 onClick={(e) => finish()}>
									{__('Finish', 'complianz-gdpr')}
								</a>
							}
						</div>
					</div>
				</div>
			</div>
			<div className="cmplz-wizard-help">
				<div className="cmplz-help-header">
					<h3 className="cmplz-h4">
						{__('Notifications', 'complianz-gdpr')}
					</h3>
					<div className="cmplz-help-control" onClick={() => toggleNotices()}>
						{!noticesExpanded && __('Expand all', 'complianz-gdpr')}
						{noticesExpanded && __('Collapse all', 'complianz-gdpr')}
					</div>
				</div>
				{helpNotices.map(
					(field, i) => <Help key={i} noticesExpanded={noticesExpanded}
															help={field} fieldId={field.id}/>)}
			</div>
			{selectedMainMenuItem === 'banner' && CookieBannerPreview &&
				<CookieBannerPreview/>}
		</>
	);

};
export default Settings;

export const ScrollProgress = () => {
	// calculate the scroll progress
	const [scrollProgress, setScrollProgress] = useState(0);
	useEffect(() => {
		window.addEventListener('scroll', () => {
			let scrollableHeight = document.documentElement.scrollHeight -
				document.documentElement.clientHeight;
			let scrollProgressPercentage = Math.round(
				(window.scrollY / scrollableHeight) * 100);
			// start at 5% and end at 100%
			scrollProgressPercentage = Math.max(5, scrollProgressPercentage);
			setScrollProgress(scrollProgressPercentage);
		});
	}, []);

	// if you can't scroll return null
	if (document.documentElement.scrollHeight <=
		document.documentElement.clientHeight) {
		return null;
	}
	return (
		// add width to span
		<span className={'cmplz-grid-item-footer-scroll-progress-container'}>
			<span className={'cmplz-grid-item-footer-scroll-progress'}
						style={{width: scrollProgress + '%'}}>{scrollProgress}%</span>
		</span>
	);
};
