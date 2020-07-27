import React from 'react'
import { SEO } from '../components/SEO'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

export const query = graphql`
	query flagQueryPrivacyPolicy {
		english: file(relativePath: { eq: "img/flag/english-32.png" }) {
			childImageSharp {
				# Specify the image processing specifications right in the query.
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
		german: file(relativePath: { eq: "img/flag/german-32.png" }) {
			childImageSharp {
				# Specify the image processing specifications right in the query.
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`

const PrivacyPolicy = ({ data }: any): React.ReactElement => {
	console.log(data)
	return (
		<>
			<SEO title="Privacy Policy" metaDescription="Privacy Policy" />

			<div className="blog-post-content m-2 markdown flex flex-row">
				<a href="#privacy-policy-en" className="flex flex-row mr-4">
					<Img
						fluid={data!.english!.childImageSharp!.fluid}
						alt="Avatar"
						className="w-12 h-8 mr-2"
					/>
					English Version
				</a>
				<a href="#privacy-policy-de" className="flex flex-row">
					<Img
						fluid={data!.german!.childImageSharp!.fluid}
						alt="Avatar"
						className="w-12 h-8 mr-2"
					/>
					Deutsche Version
				</a>
			</div>

			{/* English */}
			<article
				id="privacy-policy-en"
				className="blog-post-content m-2 markdown"
			>
				<header>
					<h1>Privacy Policy</h1>
				</header>
				<p>
					We are very delighted that you have shown interest in our enterprise.
					Data protection is of a particularly high priority for the management
					of the Test. The use of the Internet pages of the Test is possible
					without any indication of personal data; however, if a data subject
					wants to use special enterprise services via our website, processing
					of personal data could become necessary. If the processing of personal
					data is necessary and there is no statutory basis for such processing,
					we generally obtain consent from the data subject.
				</p>

				<p>
					The processing of personal data, such as the name, address, e-mail
					address, or telephone number of a data subject shall always be in line
					with the General Data Protection Regulation (GDPR), and in accordance
					with the country-specific data protection regulations applicable to
					the Test. By means of this data protection declaration, our enterprise
					would like to inform the general public of the nature, scope, and
					purpose of the personal data we collect, use and process. Furthermore,
					data subjects are informed, by means of this data protection
					declaration, of the rights to which they are entitled.
				</p>

				<p>
					As the controller, the Test has implemented numerous technical and
					organizational measures to ensure the most complete protection of
					personal data processed through this website. However, Internet-based
					data transmissions may in principle have security gaps, so absolute
					protection may not be guaranteed. For this reason, every data subject
					is free to transfer personal data to us via alternative means, e.g. by
					telephone.{' '}
				</p>

				<h4>1. Definitions</h4>
				<p>
					The data protection declaration of the Test is based on the terms used
					by the European legislator for the adoption of the General Data
					Protection Regulation (GDPR). Our data protection declaration should
					be legible and understandable for the general public, as well as our
					customers and business partners. To ensure this, we would like to
					first explain the terminology used.
				</p>

				<p>
					In this data protection declaration, we use, inter alia, the following
					terms:
				</p>

				<ul className="list-none">
					<li>
						<h4>a) Personal data</h4>
						<p>
							Personal data means any information relating to an identified or
							identifiable natural person (“data subject”). An identifiable
							natural person is one who can be identified, directly or
							indirectly, in particular by reference to an identifier such as a
							name, an identification number, location data, an online
							identifier or to one or more factors specific to the physical,
							physiological, genetic, mental, economic, cultural or social
							identity of that natural person.
						</p>
					</li>
					<li>
						<h4>b) Data subject</h4>
						<p>
							Data subject is any identified or identifiable natural person,
							whose personal data is processed by the controller responsible for
							the processing.
						</p>
					</li>
					<li>
						<h4>c) Processing</h4>
						<p>
							Processing is any operation or set of operations which is
							performed on personal data or on sets of personal data, whether or
							not by automated means, such as collection, recording,
							organisation, structuring, storage, adaptation or alteration,
							retrieval, consultation, use, disclosure by transmission,
							dissemination or otherwise making available, alignment or
							combination, restriction, erasure or destruction.{' '}
						</p>
					</li>
					<li>
						<h4>d) Restriction of processing</h4>
						<p>
							Restriction of processing is the marking of stored personal data
							with the aim of limiting their processing in the future.{' '}
						</p>
					</li>
					<li>
						<h4>e) Profiling</h4>
						<p>
							Profiling means any form of automated processing of personal data
							consisting of the use of personal data to evaluate certain
							personal aspects relating to a natural person, in particular to
							analyse or predict aspects concerning that natural person's
							performance at work, economic situation, health, personal
							preferences, interests, reliability, behaviour, location or
							movements.{' '}
						</p>
					</li>
					<li>
						<h4>f) Pseudonymisation</h4>
						<p>
							Pseudonymisation is the processing of personal data in such a
							manner that the personal data can no longer be attributed to a
							specific data subject without the use of additional information,
							provided that such additional information is kept separately and
							is subject to technical and organisational measures to ensure that
							the personal data are not attributed to an identified or
							identifiable natural person.{' '}
						</p>
					</li>
					<li>
						<h4>g) Controller or controller responsible for the processing</h4>
						<p>
							Controller or controller responsible for the processing is the
							natural or legal person, public authority, agency or other body
							which, alone or jointly with others, determines the purposes and
							means of the processing of personal data; where the purposes and
							means of such processing are determined by Union or Member State
							law, the controller or the specific criteria for its nomination
							may be provided for by Union or Member State law.{' '}
						</p>
					</li>
					<li>
						<h4>h) Processor</h4>
						<p>
							Processor is a natural or legal person, public authority, agency
							or other body which processes personal data on behalf of the
							controller.{' '}
						</p>
					</li>
					<li>
						<h4>i) Recipient</h4>
						<p>
							Recipient is a natural or legal person, public authority, agency
							or another body, to which the personal data are disclosed, whether
							a third party or not. However, public authorities which may
							receive personal data in the framework of a particular inquiry in
							accordance with Union or Member State law shall not be regarded as
							recipients; the processing of those data by those public
							authorities shall be in compliance with the applicable data
							protection rules according to the purposes of the processing.{' '}
						</p>
					</li>
					<li>
						<h4>j) Third party</h4>
						<p>
							Third party is a natural or legal person, public authority, agency
							or body other than the data subject, controller, processor and
							persons who, under the direct authority of the controller or
							processor, are authorised to process personal data.
						</p>
					</li>
					<li>
						<h4>k) Consent</h4>
						<p>
							Consent of the data subject is any freely given, specific,
							informed and unambiguous indication of the data subject's wishes
							by which he or she, by a statement or by a clear affirmative
							action, signifies agreement to the processing of personal data
							relating to him or her.{' '}
						</p>
					</li>
				</ul>

				<h4>2. Name and Address of the controller</h4>
				<p>
					Controller for the purposes of the General Data Protection Regulation
					(GDPR), other data protection laws applicable in Member states of the
					European Union and other provisions related to data protection is:
				</p>

				<p>Simon Scholz</p>
				<p>Uckermarkweg 12a</p>
				<p>22415 Hamburg</p>
				<p>Germany / Deutschland</p>
				<p>Phone: +49 176 - 43 622 060</p>
				<p>Email: opensource.simon@gmail.com</p>
				<p>Website: https://simonscholz.github.io/</p>

				<h4>3. Cookies</h4>
				<p>
					The Internet pages of the Test use cookies. Cookies are text files
					that are stored in a computer system via an Internet browser.
				</p>

				<p>
					Many Internet sites and servers use cookies. Many cookies contain a
					so-called cookie ID. A cookie ID is a unique identifier of the cookie.
					It consists of a character string through which Internet pages and
					servers can be assigned to the specific Internet browser in which the
					cookie was stored. This allows visited Internet sites and servers to
					differentiate the individual browser of the dats subject from other
					Internet browsers that contain other cookies. A specific Internet
					browser can be recognized and identified using the unique cookie ID.
				</p>

				<p>
					Through the use of cookies, the Test can provide the users of this
					website with more user-friendly services that would not be possible
					without the cookie setting.
				</p>

				<p>
					By means of a cookie, the information and offers on our website can be
					optimized with the user in mind. Cookies allow us, as previously
					mentioned, to recognize our website users. The purpose of this
					recognition is to make it easier for users to utilize our website. The
					website user that uses cookies, e.g. does not have to enter access
					data each time the website is accessed, because this is taken over by
					the website, and the cookie is thus stored on the user's computer
					system. Another example is the cookie of a shopping cart in an online
					shop. The online store remembers the articles that a customer has
					placed in the virtual shopping cart via a cookie.
				</p>

				<p>
					The data subject may, at any time, prevent the setting of cookies
					through our website by means of a corresponding setting of the
					Internet browser used, and may thus permanently deny the setting of
					cookies. Furthermore, already set cookies may be deleted at any time
					via an Internet browser or other software programs. This is possible
					in all popular Internet browsers. If the data subject deactivates the
					setting of cookies in the Internet browser used, not all functions of
					our website may be entirely usable.
				</p>

				<h4>4. Collection of general data and information</h4>
				<p>
					The website of the Test collects a series of general data and
					information when a data subject or automated system calls up the
					website. This general data and information are stored in the server
					log files. Collected may be (1) the browser types and versions used,
					(2) the operating system used by the accessing system, (3) the website
					from which an accessing system reaches our website (so-called
					referrers), (4) the sub-websites, (5) the date and time of access to
					the Internet site, (6) an Internet protocol address (IP address), (7)
					the Internet service provider of the accessing system, and (8) any
					other similar data and information that may be used in the event of
					attacks on our information technology systems.
				</p>

				<p>
					When using these general data and information, the Test does not draw
					any conclusions about the data subject. Rather, this information is
					needed to (1) deliver the content of our website correctly, (2)
					optimize the content of our website as well as its advertisement, (3)
					ensure the long-term viability of our information technology systems
					and website technology, and (4) provide law enforcement authorities
					with the information necessary for criminal prosecution in case of a
					cyber-attack. Therefore, the Test analyzes anonymously collected data
					and information statistically, with the aim of increasing the data
					protection and data security of our enterprise, and to ensure an
					optimal level of protection for the personal data we process. The
					anonymous data of the server log files are stored separately from all
					personal data provided by a data subject.
				</p>

				<h4>5. Routine erasure and blocking of personal data</h4>
				<p>
					The data controller shall process and store the personal data of the
					data subject only for the period necessary to achieve the purpose of
					storage, or as far as this is granted by the European legislator or
					other legislators in laws or regulations to which the controller is
					subject to.
				</p>

				<p>
					If the storage purpose is not applicable, or if a storage period
					prescribed by the European legislator or another competent legislator
					expires, the personal data are routinely blocked or erased in
					accordance with legal requirements.
				</p>

				<h4>6. Rights of the data subject</h4>
				<ul className="list-none">
					<li>
						<h4>a) Right of confirmation</h4>
						<p>
							Each data subject shall have the right granted by the European
							legislator to obtain from the controller the confirmation as to
							whether or not personal data concerning him or her are being
							processed. If a data subject wishes to avail himself of this right
							of confirmation, he or she may, at any time, contact any employee
							of the controller.
						</p>
					</li>
					<li>
						<h4>b) Right of access</h4>
						<p>
							Each data subject shall have the right granted by the European
							legislator to obtain from the controller free information about
							his or her personal data stored at any time and a copy of this
							information. Furthermore, the European directives and regulations
							grant the data subject access to the following information:
						</p>

						<ul className="list-none">
							<li>the purposes of the processing;</li>
							<li>the categories of personal data concerned;</li>
							<li>
								the recipients or categories of recipients to whom the personal
								data have been or will be disclosed, in particular recipients in
								third countries or international organisations;
							</li>
							<li>
								where possible, the envisaged period for which the personal data
								will be stored, or, if not possible, the criteria used to
								determine that period;
							</li>
							<li>
								the existence of the right to request from the controller
								rectification or erasure of personal data, or restriction of
								processing of personal data concerning the data subject, or to
								object to such processing;
							</li>
							<li>
								the existence of the right to lodge a complaint with a
								supervisory authority;
							</li>
							<li>
								where the personal data are not collected from the data subject,
								any available information as to their source;
							</li>
							<li>
								the existence of automated decision-making, including profiling,
								referred to in Article 22(1) and (4) of the GDPR and, at least
								in those cases, meaningful information about the logic involved,
								as well as the significance and envisaged consequences of such
								processing for the data subject.
							</li>
						</ul>
						<p>
							Furthermore, the data subject shall have a right to obtain
							information as to whether personal data are transferred to a third
							country or to an international organisation. Where this is the
							case, the data subject shall have the right to be informed of the
							appropriate safeguards relating to the transfer.
						</p>

						<p>
							If a data subject wishes to avail himself of this right of access,
							he or she may, at any time, contact any employee of the
							controller.
						</p>
					</li>
					<li>
						<h4>c) Right to rectification </h4>
						<p>
							Each data subject shall have the right granted by the European
							legislator to obtain from the controller without undue delay the
							rectification of inaccurate personal data concerning him or her.
							Taking into account the purposes of the processing, the data
							subject shall have the right to have incomplete personal data
							completed, including by means of providing a supplementary
							statement.
						</p>

						<p>
							If a data subject wishes to exercise this right to rectification,
							he or she may, at any time, contact any employee of the
							controller.
						</p>
					</li>
					<li>
						<h4>d) Right to erasure (Right to be forgotten) </h4>
						<p>
							Each data subject shall have the right granted by the European
							legislator to obtain from the controller the erasure of personal
							data concerning him or her without undue delay, and the controller
							shall have the obligation to erase personal data without undue
							delay where one of the following grounds applies, as long as the
							processing is not necessary:{' '}
						</p>

						<ul className="list-none">
							<li>
								The personal data are no longer necessary in relation to the
								purposes for which they were collected or otherwise processed.
							</li>
							<li>
								The data subject withdraws consent to which the processing is
								based according to point (a) of Article 6(1) of the GDPR, or
								point (a) of Article 9(2) of the GDPR, and where there is no
								other legal ground for the processing.
							</li>
							<li>
								The data subject objects to the processing pursuant to Article
								21(1) of the GDPR and there are no overriding legitimate grounds
								for the processing, or the data subject objects to the
								processing pursuant to Article 21(2) of the GDPR.{' '}
							</li>
							<li>The personal data have been unlawfully processed.</li>
							<li>
								The personal data must be erased for compliance with a legal
								obligation in Union or Member State law to which the controller
								is subject.
							</li>
							<li>
								The personal data have been collected in relation to the offer
								of information society services referred to in Article 8(1) of
								the GDPR.
							</li>
						</ul>
						<p>
							If one of the aforementioned reasons applies, and a data subject
							wishes to request the erasure of personal data stored by the Test,
							he or she may, at any time, contact any employee of the
							controller. An employee of Test shall promptly ensure that the
							erasure request is complied with immediately.
						</p>

						<p>
							Where the controller has made personal data public and is obliged
							pursuant to Article 17(1) to erase the personal data, the
							controller, taking account of available technology and the cost of
							implementation, shall take reasonable steps, including technical
							measures, to inform other controllers processing the personal data
							that the data subject has requested erasure by such controllers of
							any links to, or copy or replication of, those personal data, as
							far as processing is not required. An employees of the Test will
							arrange the necessary measures in individual cases.
						</p>
					</li>
					<li>
						<h4>e) Right of restriction of processing</h4>
						<p>
							Each data subject shall have the right granted by the European
							legislator to obtain from the controller restriction of processing
							where one of the following applies:
						</p>

						<ul className="list-none">
							<li>
								The accuracy of the personal data is contested by the data
								subject, for a period enabling the controller to verify the
								accuracy of the personal data.{' '}
							</li>
							<li>
								The processing is unlawful and the data subject opposes the
								erasure of the personal data and requests instead the
								restriction of their use instead.
							</li>
							<li>
								The controller no longer needs the personal data for the
								purposes of the processing, but they are required by the data
								subject for the establishment, exercise or defence of legal
								claims.
							</li>
							<li>
								The data subject has objected to processing pursuant to Article
								21(1) of the GDPR pending the verification whether the
								legitimate grounds of the controller override those of the data
								subject.
							</li>
						</ul>
						<p>
							If one of the aforementioned conditions is met, and a data subject
							wishes to request the restriction of the processing of personal
							data stored by the Test, he or she may at any time contact any
							employee of the controller. The employee of the Test will arrange
							the restriction of the processing.{' '}
						</p>
					</li>
					<li>
						<h4>f) Right to data portability</h4>
						<p>
							Each data subject shall have the right granted by the European
							legislator, to receive the personal data concerning him or her,
							which was provided to a controller, in a structured, commonly used
							and machine-readable format. He or she shall have the right to
							transmit those data to another controller without hindrance from
							the controller to which the personal data have been provided, as
							long as the processing is based on consent pursuant to point (a)
							of Article 6(1) of the GDPR or point (a) of Article 9(2) of the
							GDPR, or on a contract pursuant to point (b) of Article 6(1) of
							the GDPR, and the processing is carried out by automated means, as
							long as the processing is not necessary for the performance of a
							task carried out in the public interest or in the exercise of
							official authority vested in the controller.
						</p>

						<p>
							Furthermore, in exercising his or her right to data portability
							pursuant to Article 20(1) of the GDPR, the data subject shall have
							the right to have personal data transmitted directly from one
							controller to another, where technically feasible and when doing
							so does not adversely affect the rights and freedoms of others.
						</p>

						<p>
							In order to assert the right to data portability, the data subject
							may at any time contact any employee of the Test.
						</p>
					</li>
					<li>
						<h4>g) Right to object</h4>
						<p>
							Each data subject shall have the right granted by the European
							legislator to object, on grounds relating to his or her particular
							situation, at any time, to processing of personal data concerning
							him or her, which is based on point (e) or (f) of Article 6(1) of
							the GDPR. This also applies to profiling based on these
							provisions.
						</p>

						<p>
							The Test shall no longer process the personal data in the event of
							the objection, unless we can demonstrate compelling legitimate
							grounds for the processing which override the interests, rights
							and freedoms of the data subject, or for the establishment,
							exercise or defence of legal claims.
						</p>

						<p>
							If the Test processes personal data for direct marketing purposes,
							the data subject shall have the right to object at any time to
							processing of personal data concerning him or her for such
							marketing. This applies to profiling to the extent that it is
							related to such direct marketing. If the data subject objects to
							the Test to the processing for direct marketing purposes, the Test
							will no longer process the personal data for these purposes.
						</p>

						<p>
							In addition, the data subject has the right, on grounds relating
							to his or her particular situation, to object to processing of
							personal data concerning him or her by the Test for scientific or
							historical research purposes, or for statistical purposes pursuant
							to Article 89(1) of the GDPR, unless the processing is necessary
							for the performance of a task carried out for reasons of public
							interest.
						</p>

						<p>
							In order to exercise the right to object, the data subject may
							contact any employee of the Test. In addition, the data subject is
							free in the context of the use of information society services,
							and notwithstanding Directive 2002/58/EC, to use his or her right
							to object by automated means using technical specifications.
						</p>
					</li>
					<li>
						<h4>
							h) Automated individual decision-making, including profiling
						</h4>
						<p>
							Each data subject shall have the right granted by the European
							legislator not to be subject to a decision based solely on
							automated processing, including profiling, which produces legal
							effects concerning him or her, or similarly significantly affects
							him or her, as long as the decision (1) is not is necessary for
							entering into, or the performance of, a contract between the data
							subject and a data controller, or (2) is not authorised by Union
							or Member State law to which the controller is subject and which
							also lays down suitable measures to safeguard the data subject's
							rights and freedoms and legitimate interests, or (3) is not based
							on the data subject's explicit consent.
						</p>

						<p>
							If the decision (1) is necessary for entering into, or the
							performance of, a contract between the data subject and a data
							controller, or (2) it is based on the data subject's explicit
							consent, the Test shall implement suitable measures to safeguard
							the data subject's rights and freedoms and legitimate interests,
							at least the right to obtain human intervention on the part of the
							controller, to express his or her point of view and contest the
							decision.
						</p>

						<p>
							If the data subject wishes to exercise the rights concerning
							automated individual decision-making, he or she may, at any time,
							contact any employee of the Test.
						</p>
					</li>
					<li>
						<h4>i) Right to withdraw data protection consent </h4>
						<p>
							Each data subject shall have the right granted by the European
							legislator to withdraw his or her consent to processing of his or
							her personal data at any time.{' '}
						</p>

						<p>
							If the data subject wishes to exercise the right to withdraw the
							consent, he or she may, at any time, contact any employee of the
							Test.
						</p>
					</li>
				</ul>
				<h4>
					7. Data protection provisions about the application and use of
					functions pertaining to the collection society WORT (VG WORT)
				</h4>
				<p>
					On this website, the controller has integrated a tracking pixel. A
					tracking pixel is a thumbnail image that is embedded in web pages to
					enable a log file recording and a log file analysis so that a
					statistical analysis may be performed. The integrated tracking pixels
					serve the Scalable Central Measurement System (SZMS) of the collecting
					society WORT (VG Wort).
				</p>

				<p>
					The Scalable Central Measurement System is operated by INFOnline GmbH,
					Brühler Str. 9, 53119 Bonn, Germany.
				</p>

				<p>
					The Scalable Central Measurement System is used to determine with
					statistical key figures, the probability of the copying of texts. The
					embedded tracking pixel ensures that the collecting society WORT may
					detect whether, when, and how various users (including the data
					subject) opened our website and what content was retrieved.
				</p>

				<p>
					The data obtained using the Scalable Central Measurement System is
					collected anonymously. To capture the traffic, either a so-called
					session cookie is created for the purpose of recognition of the users
					of a website, that is a signature, which consists of various
					automatically transmitted information, or alternative methods are
					used. The IP address of the Internet connection used by the data
					subject is collected only in anonymised form and processed. The data
					subject is not identified at any time.
				</p>

				<p>
					The data subject may, as stated above, prevent the setting of cookies
					through our website at any time by means of a corresponding adjustment
					of the web browser used and thus contradict the setting of cookies
					permanently. Such an adjustment to the Internet browser used would
					also prevent VG Wort from setting a cookie on the information
					technology system of the data subject. In addition, cookies already in
					use by VG Wort may be deleted at any time via a web browser or other
					software programs.
				</p>

				<p>
					In addition, the data subject has the possibility of objecting to a
					collection of data generated by VG Wort related to the use of this
					website, as well as to the processing of these data through VG Wort
					and the chance to preclude any such. For this purpose, the data
					subject must press the ‘opt-out’ button under the link
					http://optout.ioam.de, which sets an opt-out cookie. The opt-out
					cookie used for this purpose is placed on the information technology
					system used by the data subject. If the cookies are deleted on the
					system of the data subject, then the data subject must call up the
					link again and set a new opt-out cookie.
				</p>

				<p>
					With the setting of the opt-out cookie, however, the possibility
					exists that the websites of the controller are not fully usable
					anymore by the data subject.
				</p>

				<p>
					The applicable data protection provisions of INFOnline may be accessed
					under https://www.infonline.de/datenschutz/.
				</p>

				<h4>
					8. Data protection provisions about the application and use of Google
					AdSense
				</h4>
				<p>
					On this website, the controller has integrated Google AdSense. Google
					AdSense is an online service which allows the placement of advertising
					on third-party sites. Google AdSense is based on an algorithm that
					selects advertisements displayed on third-party sites to match with
					the content of the respective third-party site. Google AdSense allows
					an interest-based targeting of the Internet user, which is implemented
					by means of generating individual user profiles.{' '}
				</p>

				<p>
					The operating company of Google's AdSense component is Google Ireland
					Limited, Gordon House, Barrow Street, Dublin, D04 E5W5, Ireland.
				</p>

				<p>
					The purpose of Google's AdSense component is the integration of
					advertisements on our website. Google AdSense places a cookie on the
					information technology system of the data subject. The definition of
					cookies is explained above. With the setting of the cookie, Alphabet
					Inc. is enabled to analyze the use of our website. With each call-up
					to one of the individual pages of this Internet site, which is
					operated by the controller and into which a Google AdSense component
					is integrated, the Internet browser on the information technology
					system of the data subject will automatically submit data through the
					Google AdSense component for the purpose of online advertising and the
					settlement of commissions to Alphabet Inc. During the course of this
					technical procedure, the enterprise Alphabet Inc. gains knowledge of
					personal data, such as the IP address of the data subject, which
					serves Alphabet Inc., inter alia, to understand the origin of visitors
					and clicks and subsequently create commission settlements.
				</p>

				<p>
					The data subject may, as stated above, prevent the setting of cookies
					through our website at any time by means of a corresponding adjustment
					of the web browser used and thus permanently deny the setting of
					cookies. Such an adjustment to the Internet browser used would also
					prevent Alphabet Inc. from setting a cookie on the information
					technology system of the data subject. Additionally, cookies already
					in use by Alphabet Inc. may be deleted at any time via a web browser
					or other software programs.
				</p>

				<p>
					Furthermore, Google AdSense also uses so-called tracking pixels. A
					tracking pixel is a miniature graphic that is embedded in web pages to
					enable a log file recording and a log file analysis through which a
					statistical analysis may be performed. Based on the embedded tracking
					pixels, Alphabet Inc. is able to determine if and when a website was
					opened by a data subject, and which links were clicked on by the data
					subject. Tracking pixels serve, inter alia, to analyze the flow of
					visitors on a website.
				</p>

				<p>
					Through Google AdSense, personal data and information—which also
					includes the IP address, and is necessary for the collection and
					accounting of the displayed advertisements—is transmitted to Alphabet
					Inc. in the United States of America. These personal data will be
					stored and processed in the United States of America. The Alphabet
					Inc. may disclose the collected personal data through this technical
					procedure to third parties.
				</p>

				<p>
					Google AdSense is further explained under the following link
					https://www.google.com/intl/en/adsense/start/.
				</p>

				<h4>
					9. Data protection provisions about the application and use of Google
					Analytics (with anonymization function)
				</h4>
				<p>
					On this website, the controller has integrated the component of Google
					Analytics (with the anonymizer function). Google Analytics is a web
					analytics service. Web analytics is the collection, gathering, and
					analysis of data about the behavior of visitors to websites. A web
					analysis service collects, inter alia, data about the website from
					which a person has come (the so-called referrer), which sub-pages were
					visited, or how often and for what duration a sub-page was viewed. Web
					analytics are mainly used for the optimization of a website and in
					order to carry out a cost-benefit analysis of Internet advertising.
				</p>

				<p>
					The operator of the Google Analytics component is Google Ireland
					Limited, Gordon House, Barrow Street, Dublin, D04 E5W5, Ireland.
				</p>

				<p>
					For the web analytics through Google Analytics the controller uses the
					application "_gat. _anonymizeIp". By means of this application the IP
					address of the Internet connection of the data subject is abridged by
					Google and anonymised when accessing our websites from a Member State
					of the European Union or another Contracting State to the Agreement on
					the European Economic Area.
				</p>

				<p>
					The purpose of the Google Analytics component is to analyze the
					traffic on our website. Google uses the collected data and
					information, inter alia, to evaluate the use of our website and to
					provide online reports, which show the activities on our websites, and
					to provide other services concerning the use of our Internet site for
					us.
				</p>

				<p>
					Google Analytics places a cookie on the information technology system
					of the data subject. The definition of cookies is explained above.
					With the setting of the cookie, Google is enabled to analyze the use
					of our website. With each call-up to one of the individual pages of
					this Internet site, which is operated by the controller and into which
					a Google Analytics component was integrated, the Internet browser on
					the information technology system of the data subject will
					automatically submit data through the Google Analytics component for
					the purpose of online advertising and the settlement of commissions to
					Google. During the course of this technical procedure, the enterprise
					Google gains knowledge of personal information, such as the IP address
					of the data subject, which serves Google, inter alia, to understand
					the origin of visitors and clicks, and subsequently create commission
					settlements.
				</p>

				<p>
					The cookie is used to store personal information, such as the access
					time, the location from which the access was made, and the frequency
					of visits of our website by the data subject. With each visit to our
					Internet site, such personal data, including the IP address of the
					Internet access used by the data subject, will be transmitted to
					Google in the United States of America. These personal data are stored
					by Google in the United States of America. Google may pass these
					personal data collected through the technical procedure to third
					parties.
				</p>

				<p>
					The data subject may, as stated above, prevent the setting of cookies
					through our website at any time by means of a corresponding adjustment
					of the web browser used and thus permanently deny the setting of
					cookies. Such an adjustment to the Internet browser used would also
					prevent Google Analytics from setting a cookie on the information
					technology system of the data subject. In addition, cookies already in
					use by Google Analytics may be deleted at any time via a web browser
					or other software programs.
				</p>

				<p>
					In addition, the data subject has the possibility of objecting to a
					collection of data that are generated by Google Analytics, which is
					related to the use of this website, as well as the processing of this
					data by Google and the chance to preclude any such. For this purpose,
					the data subject must download a browser add-on under the link
					https://tools.google.com/dlpage/gaoptout and install it. This browser
					add-on tells Google Analytics through a JavaScript, that any data and
					information about the visits of Internet pages may not be transmitted
					to Google Analytics. The installation of the browser add-ons is
					considered an objection by Google. If the information technology
					system of the data subject is later deleted, formatted, or newly
					installed, then the data subject must reinstall the browser add-ons to
					disable Google Analytics. If the browser add-on was uninstalled by the
					data subject or any other person who is attributable to their sphere
					of competence, or is disabled, it is possible to execute the
					reinstallation or reactivation of the browser add-ons.
				</p>

				<p>
					Further information and the applicable data protection provisions of
					Google may be retrieved under
					https://www.google.com/intl/en/policies/privacy/ and under
					http://www.google.com/analytics/terms/us.html. Google Analytics is
					further explained under the following Link
					https://www.google.com/analytics/.
				</p>

				<h4>
					10. Data protection provisions about the application and use of
					YouTube
				</h4>
				<p>
					On this website, the controller has integrated components of YouTube.
					YouTube is an Internet video portal that enables video publishers to
					set video clips and other users free of charge, which also provides
					free viewing, review and commenting on them. YouTube allows you to
					publish all kinds of videos, so you can access both full movies and TV
					broadcasts, as well as music videos, trailers, and videos made by
					users via the Internet portal.
				</p>

				<p>
					The operating company of YouTube is Google Ireland Limited, Gordon
					House, Barrow Street, Dublin, D04 E5W5, Ireland.
				</p>

				<p>
					With each call-up to one of the individual pages of this Internet
					site, which is operated by the controller and on which a YouTube
					component (YouTube video) was integrated, the Internet browser on the
					information technology system of the data subject is automatically
					prompted to download a display of the corresponding YouTube component.
					Further information about YouTube may be obtained under
					https://www.youtube.com/yt/about/en/. During the course of this
					technical procedure, YouTube and Google gain knowledge of what
					specific sub-page of our website was visited by the data subject.
				</p>

				<p>
					If the data subject is logged in on YouTube, YouTube recognizes with
					each call-up to a sub-page that contains a YouTube video, which
					specific sub-page of our Internet site was visited by the data
					subject. This information is collected by YouTube and Google and
					assigned to the respective YouTube account of the data subject.
				</p>

				<p>
					YouTube and Google will receive information through the YouTube
					component that the data subject has visited our website, if the data
					subject at the time of the call to our website is logged in on
					YouTube; this occurs regardless of whether the person clicks on a
					YouTube video or not. If such a transmission of this information to
					YouTube and Google is not desirable for the data subject, the delivery
					may be prevented if the data subject logs off from their own YouTube
					account before a call-up to our website is made.
				</p>

				<p>
					YouTube's data protection provisions, available at
					https://www.google.com/intl/en/policies/privacy/, provide information
					about the collection, processing and use of personal data by YouTube
					and Google.
				</p>

				<h4>11. Legal basis for the processing </h4>
				<p>
					Art. 6(1) lit. a GDPR serves as the legal basis for processing
					operations for which we obtain consent for a specific processing
					purpose. If the processing of personal data is necessary for the
					performance of a contract to which the data subject is party, as is
					the case, for example, when processing operations are necessary for
					the supply of goods or to provide any other service, the processing is
					based on Article 6(1) lit. b GDPR. The same applies to such processing
					operations which are necessary for carrying out pre-contractual
					measures, for example in the case of inquiries concerning our products
					or services. Is our company subject to a legal obligation by which
					processing of personal data is required, such as for the fulfillment
					of tax obligations, the processing is based on Art. 6(1) lit. c GDPR.
					In rare cases, the processing of personal data may be necessary to
					protect the vital interests of the data subject or of another natural
					person. This would be the case, for example, if a visitor were injured
					in our company and his name, age, health insurance data or other vital
					information would have to be passed on to a doctor, hospital or other
					third party. Then the processing would be based on Art. 6(1) lit. d
					GDPR. Finally, processing operations could be based on Article 6(1)
					lit. f GDPR. This legal basis is used for processing operations which
					are not covered by any of the abovementioned legal grounds, if
					processing is necessary for the purposes of the legitimate interests
					pursued by our company or by a third party, except where such
					interests are overridden by the interests or fundamental rights and
					freedoms of the data subject which require protection of personal
					data. Such processing operations are particularly permissible because
					they have been specifically mentioned by the European legislator. He
					considered that a legitimate interest could be assumed if the data
					subject is a client of the controller (Recital 47 Sentence 2 GDPR).
				</p>

				<h4>
					12. The legitimate interests pursued by the controller or by a third
					party
				</h4>
				<p>
					Where the processing of personal data is based on Article 6(1) lit. f
					GDPR our legitimate interest is to carry out our business in favor of
					the well-being of all our employees and the shareholders.
				</p>

				<h4>13. Period for which the personal data will be stored</h4>
				<p>
					The criteria used to determine the period of storage of personal data
					is the respective statutory retention period. After expiration of that
					period, the corresponding data is routinely deleted, as long as it is
					no longer necessary for the fulfillment of the contract or the
					initiation of a contract.
				</p>

				<h4>
					14. Provision of personal data as statutory or contractual
					requirement; Requirement necessary to enter into a contract;
					Obligation of the data subject to provide the personal data; possible
					consequences of failure to provide such data{' '}
				</h4>
				<p>
					We clarify that the provision of personal data is partly required by
					law (e.g. tax regulations) or can also result from contractual
					provisions (e.g. information on the contractual partner). Sometimes it
					may be necessary to conclude a contract that the data subject provides
					us with personal data, which must subsequently be processed by us. The
					data subject is, for example, obliged to provide us with personal data
					when our company signs a contract with him or her. The non-provision
					of the personal data would have the consequence that the contract with
					the data subject could not be concluded. Before personal data is
					provided by the data subject, the data subject must contact any
					employee. The employee clarifies to the data subject whether the
					provision of the personal data is required by law or contract or is
					necessary for the conclusion of the contract, whether there is an
					obligation to provide the personal data and the consequences of
					non-provision of the personal data.
				</p>

				<h4>15. Existence of automated decision-making</h4>
				<p>
					As a responsible company, we do not use automatic decision-making or
					profiling.
				</p>

				<p>
					This Privacy Policy has been generated by the Privacy Policy Generator
					of the{' '}
					<a href="https://dg-datenschutz.de/services/external-data-protection-officer/?lang=en">
						DGD - Your External DPO
					</a>{' '}
					that was developed in cooperation with{' '}
					<a href="https://www.wbs-law.de/eng/">German Lawyers</a> from WILDE
					BEUGER SOLMECKE, Cologne.
				</p>
			</article>
			{/* German */}
			<article
				id="privacy-policy-de"
				className="blog-post-content m-2 markdown border-t-2"
			>
				<header>
					<h1>Datenschutz</h1>
				</header>
				<p>
					<strong>Verantwortlicher:</strong>
				</p>
				<p>Siehe Impressum (Footer)</p>
				<p>
					<strong>Datenschutzbeauftragter:</strong>
				</p>

				<ul>
					<li>Simon Scholz</li>
					<li>Anschrift: siehe Impressum (Footer)</li>
					<li>Telefonnummer: siehe Impressum (Footer)</li>
					<li>E-Mailadresse: siehe Impressum (Footer)</li>
				</ul>

				<p>
					<strong>Arten der verarbeiteten Daten:</strong>
				</p>
				<ul>
					<li>Bestandsdaten (z.B., Namen, Adressen)</li>
					<li>Kontaktdaten (z.B., E-Mail, Telefonnummern)</li>
					<li>Inhaltsdaten (z.B., Texteingaben, Fotografien, Videos)</li>
					<li>
						Nutzungsdaten (z.B., besuchte Webseiten, Interesse an Inhalten,
						Zugriffszeiten)
					</li>
					<li>
						Meta-/Kommunikationsdaten (z.B., Geräte-Informationen, IP-Adressen)
					</li>
				</ul>
				<p>
					<strong>
						Verarbeitung besonderer Kategorien von Daten (Art. 9 Abs. 1 DSGVO):
					</strong>
				</p>
				<p>
					<strong>
						Es werden keine besonderen Kategorien von Daten verarbeitet.
					</strong>
				</p>
				<p>Kategorien der von der Verarbeitung betroffenen Personen:</p>
				<ul>
					<li>Kunden / Interessenten / Lieferanten</li>
					<li>Besucher und Nutzer des Onlineangebotes</li>
					<li>
						Nachfolgend bezeichnen wir die betroffenen Personen zusammenfassend
						auch als „Nutzer“
					</li>
				</ul>
				<p>
					<strong>Zweck der Verarbeitung:</strong>
				</p>
				<ul>
					<li>
						Zurverfügungstellung des Onlineangebotes, seiner Inhalte und
						Funktionen
					</li>
					<li>Erbringung vertraglicher Leistungen, Service und Kundenpflege</li>
					<li>
						Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern
					</li>
					<li>Marketing, Werbung und Marktforschung</li>
					<li>Sicherheitsmaßnahmen</li>
				</ul>
				<p>Stand: 03.01.2020</p>
				<ol>
					<li>
						<strong>Maßgebliche Rechtsgrundlagen</strong>
						<ul>
							<li>
								Nach Maßgabe des Art. 13 DSGVO teilen wir Ihnen die
								Rechtsgrundlagen unserer Datenverarbeitungen mit. Sofern die
								Rechtsgrundlage in der Datenschutzerklärung nicht genannt wird,
								gilt Folgendes: Die Rechtsgrundlage für die Einholung von
								Einwilligungen ist Art. 6 Abs. 1 lit. a und Art. 7 DSGVO, die
								Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer
								Leistungen und Durchführung vertraglicher Maßnahmen sowie
								Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO, die
								Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer
								rechtlichen Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO, und
								die Rechtsgrundlage für die Verarbeitung zur Wahrung unserer
								berechtigten Interessen ist Art. 6 Abs. 1 lit. f DSGVO. Für den
								Fall, dass lebenswichtige Interessen der betroffenen Person oder
								einer anderen natürlichen Person eine Verarbeitung
								personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1
								lit. d DSGVO als Rechtsgrundlage.
							</li>
						</ul>
					</li>
				</ol>
				<ol start={2}>
					<li>
						<strong>
							Änderungen und Aktualisierungen der Datenschutzerklärung
						</strong>
						<ul>
							<li>
								Wir bitten Sie sich regelmäßig über den Inhalt unserer
								Datenschutzerklärung zu informieren. Wir passen die
								Datenschutzerklärung an, sobald die Änderungen der von uns
								durchgeführten Datenverarbeitungen dies erforderlich machen. Wir
								informieren Sie, sobald durch die Änderungen eine
								Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder eine
								sonstige individuelle Benachrichtigung erforderlich wird.
							</li>
						</ul>
					</li>
				</ol>
				<ol start={3}>
					<li>
						<strong>Sicherheitsmaßnahmen</strong>
						<ul>
							<li>
								Wir treffen nach Maßgabe des Art. 32 DSGVO unter
								Berücksichtigung des Stands der Technik, der
								Implementierungskosten und der Art, des Umfangs, der Umstände
								und der Zwecke der Verarbeitung sowie der unterschiedlichen
								Eintrittswahrscheinlichkeit und Schwere des Risikos für die
								Rechte und Freiheiten natürlicher Personen, geeignete technische
								und organisatorische Maßnahmen, um ein dem Risiko angemessenes
								Schutzniveau zu gewährleisten; Zu den Maßnahmen gehören
								insbesondere die Sicherung der Vertraulichkeit, Integrität und
								Verfügbarkeit von Daten durch Kontrolle des physischen Zugangs
								zu den Daten, als auch des sie betreffenden Zugriffs, der
								Eingabe, Weitergabe, der Sicherung der Verfügbarkeit und ihrer
								Trennung. Des Weiteren haben wir Verfahren eingerichtet, die
								eine Wahrnehmung von Betroffenenrechten, Löschung von Daten und
								Reaktion auf Gefährdung der Daten gewährleisten. Ferner
								berücksichtigen wir den Schutz personenbezogener Daten bereits
								bei der Entwicklung, bzw. Auswahl von Hardware, Software sowie
								Verfahren, entsprechend dem Prinzip des Datenschutzes durch
								Technikgestaltung und durch datenschutzfreundliche
								Voreinstellungen berücksichtigt (Art. 25 DSGVO).
							</li>
							<li>
								Zu den Sicherheitsmaßnahmen gehört insbesondere die
								verschlüsselte Übertragung von Daten zwischen Ihrem Browser und
								unserem Server.
							</li>
						</ul>
					</li>
				</ol>
				<ol start={4}>
					<li>
						<strong>Zusammenarbeit mit Auftragsverarbeitern und Dritten</strong>
						<ul>
							<li>
								Sofern wir im Rahmen unserer Verarbeitung Daten gegenüber
								anderen Personen und Unternehmen (Auftragsverarbeitern oder
								Dritten) offenbaren, sie an diese übermitteln oder ihnen sonst
								Zugriff auf die Daten gewähren, erfolgt dies nur auf Grundlage
								einer gesetzlichen Erlaubnis (z.B. wenn eine Übermittlung der
								Daten an Dritte, wie an Zahlungsdienstleister, gem. Art. 6 Abs.
								1 lit. b DSGVO zur Vertragserfüllung erforderlich ist), Sie
								eingewilligt haben, eine rechtliche Verpflichtung dies vorsieht
								oder auf Grundlage unserer berechtigten Interessen (z.B. beim
								Einsatz von Beauftragten, Webhostern, etc.).
							</li>
							<li>
								Sofern wir Dritte mit der Verarbeitung von Daten auf Grundlage
								eines sog. „Auftragsverarbeitungsvertrages“ beauftragen,
								geschieht dies auf Grundlage des Art. 28 DSGVO.
							</li>
						</ul>
					</li>
				</ol>
				<ol start={5}>
					<li>
						<strong>Übermittlungen in Drittländer</strong>
						<ul>
							<li>
								Sofern wir Daten in einem Drittland (d.h. außerhalb der
								Europäischen Union (EU) oder des Europäischen Wirtschaftsraums
								(EWR)) verarbeiten oder dies im Rahmen der Inanspruchnahme von
								Diensten Dritter oder Offenlegung, bzw. Übermittlung von Daten
								an Dritte geschieht, erfolgt dies nur, wenn es zur Erfüllung
								unserer (vor)vertraglichen Pflichten, auf Grundlage Ihrer
								Einwilligung, aufgrund einer rechtlichen Verpflichtung oder auf
								Grundlage unserer berechtigten Interessen geschieht.
								Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse,
								verarbeiten oder lassen wir die Daten in einem Drittland nur
								beim Vorliegen der besonderen Voraussetzungen der Art. 44 ff.
								DSGVO verarbeiten. D.h. die Verarbeitung erfolgt z.B. auf
								Grundlage besonderer Garantien, wie der offiziell anerkannten
								Feststellung eines der EU entsprechenden Datenschutzniveaus
								(z.B. für die USA durch das „Privacy Shield“) oder Beachtung
								offiziell anerkannter spezieller vertraglicher Verpflichtungen
								(so genannte „Standardvertragsklauseln“).
							</li>
						</ul>
					</li>
				</ol>
				<ol start={6}>
					<li>
						<strong>Rechte der betroffenen Personen</strong>
						<ul>
							<li>
								Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob
								betreffende Daten verarbeitet werden und auf Auskunft über diese
								Daten sowie auf weitere Informationen und Kopie der Daten
								entsprechend Art. 15 DSGVO.
							</li>
							<li>
								Sie haben entsprechend. Art. 16 DSGVO das Recht, die
								Vervollständigung der Sie betreffenden Daten oder die
								Berichtigung der Sie betreffenden unrichtigen Daten zu
								verlangen.
							</li>
							<li>
								Sie haben nach Maßgabe des Art. 17 DSGVO das Recht zu verlangen,
								dass betreffende Daten unverzüglich gelöscht werden, bzw.
								alternativ nach Maßgabe des Art. 18 DSGVO eine Einschränkung der
								Verarbeitung der Daten zu verlangen.
							</li>
							<li>
								Sie haben das Recht zu verlangen, dass die Sie betreffenden
								Daten, die Sie uns bereitgestellt haben nach Maßgabe des Art. 20
								DSGVO zu erhalten und deren Übermittlung an andere
								Verantwortliche zu fordern.
							</li>
							<li>
								Sie haben ferner gem. Art. 77 DSGVO das Recht, eine Beschwerde
								bei der zuständigen Aufsichtsbehörde einzureichen.
							</li>
						</ul>
					</li>
					<li>
						<strong>Widerrufsrecht</strong>
						<ul>
							<li>
								Sie haben das Recht, erteilte Einwilligungen gem. Art. 7 Abs. 3
								DSGVO mit Wirkung für die Zukunft zu widerrufen.
							</li>
						</ul>
					</li>
				</ol>
				<ol start={8}>
					<li>
						<strong>Widerspruchsrecht</strong>
						<ul>
							<li>
								Sie können der künftigen Verarbeitung der Sie betreffenden Daten
								nach Maßgabe des Art. 21 DSGVO jederzeit widersprechen. Der
								Widerspruch kann insbesondere gegen die Verarbeitung für Zwecke
								der Direktwerbung erfolgen.
							</li>
						</ul>
					</li>
				</ol>
				<ol start={9}>
					<li>
						<strong>Löschung von Daten</strong>
						<ul>
							<li>
								Die von uns verarbeiteten Daten werden nach Maßgabe der Art. 17
								und 18 DSGVO gelöscht oder in ihrer Verarbeitung eingeschränkt.
								Sofern nicht im Rahmen dieser Datenschutzerklärung ausdrücklich
								angegeben, werden die bei uns gespeicherten Daten gelöscht,
								sobald sie für ihre Zweckbestimmung nicht mehr erforderlich sind
								und der Löschung keine gesetzlichen Aufbewahrungspflichten
								entgegenstehen. Sofern die Daten nicht gelöscht werden, weil sie
								für andere und gesetzlich zulässige Zwecke erforderlich sind,
								wird deren Verarbeitung eingeschränkt. D.h. die Daten werden
								gesperrt und nicht für andere Zwecke verarbeitet. Das gilt z.B.
								für Daten, die aus handels- oder steuerrechtlichen Gründen
								aufbewahrt werden müssen.
							</li>
							<li>
								Deutschland: Nach gesetzlichen Vorgaben erfolgt die Aufbewahrung
								insbesondere für 6 Jahre gemäß § 257 Abs. 1 HGB (Handelsbücher,
								Inventare, Eröffnungsbilanzen, Jahresabschlüsse, Handelsbriefe,
								Buchungsbelege, etc.) sowie für 10 Jahre gemäß § 147 Abs. 1 AO
								(Bücher, Aufzeichnungen, Lageberichte, Buchungsbelege, Handels-
								und Geschäftsbriefe, für Besteuerung relevante Unterlagen,
								etc.).
							</li>
						</ul>
					</li>
					<li>
						<strong>Erbringung vertraglicher Leistungen</strong>
						<ul>
							<li>
								Wir verarbeiten Bestandsdaten (z.B., Namen und Adressen sowie
								Kontaktdaten von Nutzern), Vertragsdaten (z.B., in Anspruch
								genommene Leistungen, Namen von Kontaktpersonen,
								Zahlungsinformationen) zwecks Erfüllung unserer vertraglichen
								Verpflichtungen und Serviceleistungen gem. Art. 6 Abs. 1 lit b.
								DSGVO. Die in Onlineformularen als verpflichtend
								gekennzeichneten Eingaben, sind für den Vertragsschluss
								erforderlich.
							</li>
							<li>
								Nutzer können optional ein Nutzerkonto anlegen, indem sie
								insbesondere ihre Bestellungen einsehen können. Im Rahmen der
								Registrierung, werden die erforderlichen Pflichtangaben den
								Nutzern mitgeteilt. Die Nutzerkonten sind nicht öffentlich und
								können von Suchmaschinen nicht indexiert werden. Wenn Nutzer ihr
								Nutzerkonto gekündigt haben, werden deren Daten im Hinblick auf
								das Nutzerkonto gelöscht, vorbehaltlich deren Aufbewahrung ist
								aus handels- oder steuerrechtlichen Gründen entspr. Art. 6 Abs.
								1 lit. c DSGVO notwendig. Es obliegt den Nutzern, ihre Daten bei
								erfolgter Kündigung vor dem Vertragsende zu sichern. Wir sind
								berechtigt, sämtliche während der Vertragsdauer gespeicherten
								Daten des Nutzers unwiederbringlich zu löschen.
							</li>
							<li>
								Im Rahmen der Registrierung und erneuter Anmeldungen sowie
								Inanspruchnahme unserer Onlinedienste, speichern wir die
								IP-Adresse und den Zeitpunkt der jeweiligen Nutzerhandlung. Die
								Speicherung erfolgt auf Grundlage unserer berechtigten
								Interessen, als auch der Nutzer an Schutz vor Missbrauch und
								sonstiger unbefugter Nutzung. Eine Weitergabe dieser Daten an
								Dritte erfolgt grundsätzlich nicht, außer sie ist zur Verfolgung
								unserer Ansprüche erforderlich oder es besteht hierzu eine
								gesetzliche Verpflichtung gem. Art. 6 Abs. 1 lit. c DSGVO.
							</li>
							<li>
								Wir verarbeiten Nutzungsdaten (z.B., die besuchten Webseiten
								unseres Onlineangebotes, Interesse an unseren Produkten) und
								Inhaltsdaten (z.B., Eingaben im Kontaktformular oder
								Nutzerprofil) für Werbezwecke in einem Nutzerprofil, um den
								Nutzer z.B. Produkthinweise ausgehend von ihren bisher in
								Anspruch genommenen Leistungen einzublenden.
							</li>
							<li>
								Die Löschung erfolgt nach Ablauf gesetzlicher Gewährleistungs-
								und vergleichbarer Pflichten, die Erforderlichkeit der
								Aufbewahrung der Daten wird alle drei Jahre überprüft; im Fall
								der gesetzlichen Archivierungspflichten erfolgt die Löschung
								nach deren Ablauf (Ende handelsrechtlicher (6 Jahre) und
								steuerrechtlicher (10 Jahre) Aufbewahrungspflicht); Angaben im
								Kundenkonto verbleiben bis zu dessen Löschung.
							</li>
						</ul>
					</li>
					<li>
						<strong>Kontaktaufnahme</strong>
						<ul>
							<li>
								Bei der Kontaktaufnahme mit uns (per Kontaktformular oder
								E-Mail) werden die Angaben des Nutzers zur Bearbeitung der
								Kontaktanfrage und deren Abwicklung gem. Art. 6 Abs. 1 lit. b)
								DSGVO verarbeitet.
							</li>
							<li>
								Die Angaben der Nutzer können in unserem
								Customer-Relationship-Management System („CRM System“) oder
								vergleichbarer Anfragenorganisation gespeichert werden.
							</li>
							<li>
								Wir löschen die Anfragen, sofern diese nicht mehr erforderlich
								sind. Wir überprüfen die Erforderlichkeit alle zwei Jahre;
								Anfragen von Kunden, die über ein Kundenkonto verfügen,
								speichern wir dauerhaft und verweisen zur Löschung auf die
								Angaben zum Kundenkonto. Im Fall der gesetzlichen
								Archivierungspflichten erfolgt die Löschung nach deren Ablauf
								(Ende handelsrechtlicher (6 Jahre) und steuerrechtlicher (10
								Jahre) Aufbewahrungspflicht).
							</li>
						</ul>
					</li>
					<li>
						<strong>Kommentare und Beiträge</strong>
						<ul>
							<li>
								Wenn Nutzer Kommentare oder sonstige Beiträge hinterlassen,
								werden ihre IP-Adressen auf Grundlage unserer berechtigten
								Interessen im Sinne des Art. 6 Abs. 1 lit. f. DSGVO für 7 Tage
								gespeichert.
							</li>
							<li>
								Das erfolgt zu unserer Sicherheit, falls jemand in Kommentaren
								und Beiträgen widerrechtliche Inhalte hinterlässt
								(Beleidigungen, verbotene politische Propaganda, etc.). In
								diesem Fall können wir selbst für den Kommentar oder Beitrag
								belangt werden und sind daher an der Identität des Verfassers
								interessiert.
							</li>
						</ul>
					</li>

					<li>
						<strong>Erhebung von Zugriffsdaten und Logfiles</strong>
						<ul>
							<li>
								Wir erheben auf Grundlage unserer berechtigten Interessen im
								Sinne des Art. 6 Abs. 1 lit. f. DSGVO Daten über jeden Zugriff
								auf den Server, auf dem sich dieser Dienst befindet (sogenannte
								Serverlogfiles). Zu den Zugriffsdaten gehören Name der
								abgerufenen Webseite, Datei, Datum und Uhrzeit des Abrufs,
								übertragene Datenmenge, Meldung über erfolgreichen Abruf,
								Browsertyp nebst Version, das Betriebssystem des Nutzers,
								Referrer URL (die zuvor besuchte Seite), IP-Adresse und der
								anfragende Provider.
							</li>
							<li>
								Logfile-Informationen werden aus Sicherheitsgründen (z.B. zur
								Aufklärung von Missbrauchs- oder Betrugshandlungen) für die
								Dauer von maximal sieben Tagen gespeichert und danach gelöscht.
								Daten, deren weitere Aufbewahrung zu Beweiszwecken erforderlich
								ist, sind bis zur endgültigen Klärung des jeweiligen Vorfalls
								von der Löschung ausgenommen.
							</li>
						</ul>
					</li>
					<li>
						<strong>Onlinepräsenzen in sozialen Medien</strong>
						<ul>
							<li>
								Wir unterhalten auf Grundlage unserer berechtigten Interessen im
								Sinne des Art. 6 Abs. 1 lit. f. DSGVO Onlinepräsenzen innerhalb
								sozialer Netzwerke und Plattformen, um mit den dort aktiven
								Kunden, Interessenten und Nutzern kommunizieren und sie dort
								über unsere Leistungen informieren zu können. Beim Aufruf der
								jeweiligen Netzwerke und Plattformen gelten die
								Geschäftsbedingungen und die Datenverarbeitungsrichtlinien deren
								jeweiligen Betreiber.
							</li>
							<li>
								Soweit nicht anders im Rahmen unserer Datenschutzerklärung
								angegeben, verarbeiten wir die Daten der Nutzer sofern diese mit
								uns innerhalb der sozialen Netzwerke und Plattformen
								kommunizieren, z.B. Beiträge auf unseren Onlinepräsenzen
								verfassen oder uns Nachrichten zusenden.
							</li>
						</ul>
					</li>
					<li>
						<strong>Cookies &amp; Reichweitenmessung</strong>

						<ul>
							<li>
								Cookies sind Informationen, die von unserem Webserver oder
								Webservern Dritter an die Web-Browser der Nutzer übertragen und
								dort für einen späteren Abruf gespeichert werden. Bei Cookies
								kann es sich um kleine Dateien oder sonstige Arten der
								Informationsspeicherung handeln.
							</li>
							<li>
								Wir verwenden „Session-Cookies“, die nur für die Zeitdauer des
								aktuellen Besuchs auf unserer Onlinepräsenz abgelegt werden
								(z.B. um die Speicherung Ihres Login-Status oder die
								Warenkorbfunktion und somit die Nutzung unseres Onlineangebotes
								überhaupt ermöglichen zu können). In einem Session-Cookie wird
								eine zufällig erzeugte eindeutige Identifikationsnummer
								abgelegt, eine sogenannte Session-ID. Außerdem enthält ein
								Cookie die Angabe über seine Herkunft und die Speicherfrist.
								Diese Cookies können keine anderen Daten speichern.
								Session-Cookies werden gelöscht, wenn Sie die Nutzung unseres
								Onlineangebotes beendet haben und sich z.B. ausloggen oder den
								Browser schließen.
							</li>
							<li>
								Über den Einsatz von Cookies im Rahmen pseudonymer
								Reichweitenmessung werden die Nutzer im Rahmen dieser
								Datenschutzerklärung informiert.
							</li>
							<li>
								Falls die Nutzer nicht möchten, dass Cookies auf ihrem Rechner
								gespeichert werden, werden sie gebeten die entsprechende Option
								in den Systemeinstellungen ihres Browsers zu deaktivieren.
								Gespeicherte Cookies können in den Systemeinstellungen des
								Browsers gelöscht werden. Der Ausschluss von Cookies kann zu
								Funktionseinschränkungen dieses Onlineangebotes führen.
							</li>
							<li>
								Sie können dem Einsatz von Cookies, die der Reichweitenmessung
								und Werbezwecken dienen, über die Deaktivierungsseite der
								Netzwerkwerbeinitiative (
								<a rel="nofollow" href="http://optout.networkadvertising.org/">
									http://optout.networkadvertising.org/
								</a>
								) und zusätzlich die US-amerikanische Webseite(
								<a rel="nofollow" href="http://www.aboutads.info/choices">
									http://www.aboutads.info/choices
								</a>
								) oder die europäische Webseite (
								<a
									rel="nofollow"
									href="http://www.youronlinechoices.com/uk/your-ad-choices/"
								>
									http://www.youronlinechoices.com/uk/your-ad-choices/
								</a>
								) widersprechen.
							</li>
						</ul>
					</li>

					<li>
						<strong>Google Analytics</strong>
						<ul>
							<li>
								Wir setzen auf Grundlage unserer berechtigten Interessen (d.h.
								Interesse an der Analyse, Optimierung und wirtschaftlichem
								Betrieb unseres Onlineangebotes im Sinne des Art. 6 Abs. 1 lit.
								f. DSGVO) Google Analytics, einen Webanalysedienst der Google
								Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland)
								ein. Google verwendet Cookies. Die durch das Cookie erzeugten
								Informationen über Benutzung des Onlineangebotes durch die
								Nutzer werden in der Regel an einen Server von Google in den USA
								übertragen und dort gespeichert.
							</li>
							<li>
								Google ist unter dem Privacy-Shield-Abkommen zertifiziert und
								bietet hierdurch eine Garantie, das europäische Datenschutzrecht
								einzuhalten (
								<a
									rel="nofollow"
									href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active"
								>
									https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active
								</a>
								).
							</li>
							<li>
								Google wird diese Informationen in unserem Auftrag benutzen, um
								die Nutzung unseres Onlineangebotes durch die Nutzer
								auszuwerten, um Reports über die Aktivitäten innerhalb dieses
								Onlineangebotes zusammenzustellen und um weitere, mit der
								Nutzung dieses Onlineangebotes und der Internetnutzung
								verbundene Dienstleistungen, uns gegenüber zu erbringen. Dabei
								können aus den verarbeiteten Daten pseudonyme Nutzungsprofile
								der Nutzer erstellt werden.
							</li>
							<li>
								Wir setzen Google Analytics ein, um die durch innerhalb von
								Werbediensten Googles und seiner Partner geschalteten Anzeigen,
								nur solchen Nutzern anzuzeigen, die auch ein Interesse an
								unserem Onlineangebot gezeigt haben oder die bestimmte Merkmale
								(z.B. Interessen an bestimmten Themen oder Produkten, die anhand
								der besuchten Webseiten bestimmt werden) aufweisen, die wir an
								Google übermitteln (sog. „Remarketing-“, bzw.
								„Google-Analytics-Audiences“). Mit Hilfe der Remarketing
								Audiences möchten wir auch sicherstellen, dass unsere Anzeigen
								dem potentiellen Interesse der Nutzer entsprechen und nicht
								belästigend wirken.
							</li>
							<li>
								Wir setzen Google Analytics nur mit aktivierter
								IP-Anonymisierung ein. Das bedeutet, die IP-Adresse der Nutzer
								wird von Google innerhalb von Mitgliedstaaten der Europäischen
								Union oder in anderen Vertragsstaaten des Abkommens über den
								Europäischen Wirtschaftsraum gekürzt. Nur in Ausnahmefällen wird
								die volle IP-Adresse an einen Server von Google in den USA
								übertragen und dort gekürzt.
							</li>
							<li>
								Die von dem Browser des Nutzers übermittelte IP-Adresse wird
								nicht mit anderen Daten von Google zusammengeführt. Die Nutzer
								können die Speicherung der Cookies durch eine entsprechende
								Einstellung ihrer Browser-Software verhindern; die Nutzer können
								darüber hinaus die Erfassung der durch das Cookie erzeugten und
								auf ihre Nutzung des Onlineangebotes bezogenen Daten an Google
								sowie die Verarbeitung dieser Daten durch Google verhindern,
								indem sie das unter folgendem Link verfügbare Browser-Plugin
								herunterladen und installieren:
								<a
									rel="nofollow"
									href="https://tools.google.com/dlpage/gaoptout?hl=de"
								>
									https://tools.google.com/dlpage/gaoptout?hl=de
								</a>
								.
							</li>
							<li>
								Weitere Informationen zur Datennutzung durch Google,
								Einstellungs- und Widerspruchsmöglichkeiten erfahren Sie auf den
								Webseiten von Google:
								<a
									rel="nofollow"
									href="https://www.google.com/intl/de/policies/privacy/partners"
								>
									https://www.google.com/intl/de/policies/privacy/partners
								</a>{' '}
								(„Datennutzung durch Google bei Ihrer Nutzung von Websites oder
								Apps unserer Partner“),{' '}
								<a
									rel="nofollow"
									href="https://policies.google.com/technologies/ads"
								>
									https://policies.google.com/technologies/ads
								</a>{' '}
								(„Datennutzung zu Werbezwecken“),{' '}
								<a
									rel="nofollow"
									href="https://adssettings.google.com/authenticated"
								>
									https://adssettings.google.com/authenticated
								</a>{' '}
								(„Informationen verwalten, die Google verwendet, um Ihnen
								Werbung einzublenden“).
							</li>
							<li>
								Im Übrigen werden die personenbezogenen Daten nach einem Ablauf
								von 14 Monaten anonymisiert oder gelöscht
							</li>
						</ul>
					</li>
					<li>
						<strong>Google-Re/Marketing-Services</strong>
						<ul>
							<li>
								Wir nutzen auf Grundlage unserer berechtigten Interessen (d.h.
								Interesse an der Analyse, Optimierung und wirtschaftlichem
								Betrieb unseres Onlineangebotes im Sinne des Art. 6 Abs. 1 lit.
								f. DSGVO) die Marketing- und Remarketing-Dienste (kurz
								„Google-Marketing-Services”) der Google Ireland Limited (Gordon
								House, Barrow Street, Dublin 4, Irland), („Google“).
							</li>
							<li>
								Google ist unter dem Privacy-Shield-Abkommen zertifiziert und
								bietet hierdurch eine Garantie, das europäische Datenschutzrecht
								einzuhalten (
								<a
									rel="nofollow"
									href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active"
								>
									https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active
								</a>
								).
							</li>
							<li>
								Die Google-Marketing-Services erlauben uns Werbeanzeigen für und
								auf unserer Website gezielter anzuzeigen, um Nutzern nur
								Anzeigen zu präsentieren, die potentiell deren Interessen
								entsprechen. Falls einem Nutzer z.B. Anzeigen für Produkte
								angezeigt werden, für die er sich auf anderen Webseiten
								interessiert hat, spricht man hierbei vom „Remarketing“. Zu
								diesen Zwecken wird bei Aufruf unserer und anderer Webseiten,
								auf denen Google-Marketing-Services aktiv sind, unmittelbar
								durch Google ein Code von Google ausgeführt und es werden sog.
								(Re)marketing-Tags (unsichtbare Grafiken oder Code, auch als
								„Web Beacons“ bezeichnet) in die Webseite eingebunden. Mit deren
								Hilfe wird auf dem Gerät der Nutzer ein individuelles Cookie,
								d.h. eine kleine Datei abgespeichert (statt Cookies können auch
								vergleichbare Technologien verwendet werden). Die Cookies können
								von verschiedenen Domains gesetzt werden, unter anderem von
								google.com, doubleclick.net, invitemedia.com, admeld.com,
								googlesyndication.com oder googleadservices.com. In dieser Datei
								wird vermerkt, welche Webseiten der Nutzer aufgesucht, für
								welche Inhalte er sich interessiert und welche Angebote er
								geklickt hat, ferner technische Informationen zum Browser und
								Betriebssystem, verweisende Webseiten, Besuchszeit sowie weitere
								Angaben zur Nutzung des Onlineangebotes. Es wird ebenfalls die
								IP-Adresse der Nutzer erfasst, wobei wir im Rahmen von
								Google-Analytics mitteilen, dass die IP-Adresse innerhalb von
								Mitgliedstaaten der Europäischen Union oder in anderen
								Vertragsstaaten des Abkommens über den Europäischen
								Wirtschaftsraum gekürzt und nur in Ausnahmefällen ganz an einen
								Server von Google in den USA übertragen und dort gekürzt wird.
								Die IP-Adresse wird nicht mit Daten des Nutzers innerhalb von
								anderen Angeboten von Google zusammengeführt. Die vorstehend
								genannten Informationen können seitens Google auch mit solchen
								Informationen aus anderen Quellen verbunden werden. Wenn der
								Nutzer anschließend andere Webseiten besucht, können ihm
								entsprechend seiner Interessen die auf ihn abgestimmten Anzeigen
								angezeigt werden.
							</li>
							<li>
								Die Daten der Nutzer werden im Rahmen der
								Google-Marketing-Services pseudonym verarbeitet. D.h. Google
								speichert und verarbeitet z.B. nicht den Namen oder
								E-Mailadresse der Nutzer, sondern verarbeitet die relevanten
								Daten Cookie-bezogen innerhalb pseudonymer Nutzer-Profile. D.h.
								aus der Sicht von Google werden die Anzeigen nicht für eine
								konkret identifizierte Person verwaltet und angezeigt, sondern
								für den Cookie-Inhaber, unabhängig davon wer dieser
								Cookie-Inhaber ist. Dies gilt nicht, wenn ein Nutzer Google
								ausdrücklich erlaubt hat, die Daten ohne diese Pseudonymisierung
								zu verarbeiten. Die von Google-Marketing-Services über die
								Nutzer gesammelten Informationen werden an Google übermittelt
								und auf Googles Servern in den USA gespeichert.
							</li>
							<li>
								Zu den von uns eingesetzten Google-Marketing-Services gehört
								u.a. das Online-Werbeprogramm „Google AdWords“. Im Fall von
								Google AdWords, erhält jeder AdWords-Kunde ein anderes
								„Conversion-Cookie“. Cookies können somit nicht über die
								Websites von AdWords-Kunden nachverfolgt werden. Die mit Hilfe
								des Cookies eingeholten Informationen dienen dazu,
								Conversion-Statistiken für AdWords-Kunden zu erstellen, die sich
								für Conversion-Tracking entschieden haben. Die AdWords-Kunden
								erfahren die Gesamtanzahl der Nutzer, die auf ihre Anzeige
								geklickt haben und zu einer mit einem Conversion-Tracking-Tag
								versehenen Seite weitergeleitet wurden. Sie erhalten jedoch
								keine Informationen, mit denen sich Nutzer persönlich
								identifizieren lassen.
							</li>
							<li>
								Wir können auf Grundlage des Google-Marketing-Services
								„DoubleClick“ Werbeanzeigen Dritter einbinden. DoubleClick
								verwendet Cookies, mit denen Google und seinen Partner-Websites,
								die Schaltung von Anzeigen auf Basis der Besuche von Nutzern auf
								dieser Website bzw. anderen Websites im Internet ermöglicht
								wird.
							</li>
							<li>
								Wir können auf Grundlage des Google-Marketing-Services „AdSense“
								Werbeanzeigen Dritter einbinden. AdSense verwendet Cookies, mit
								denen Google und seinen Partner-Websites, die Schaltung von
								Anzeigen auf Basis der Besuche von Nutzern auf dieser Website
								bzw. anderen Websites im Internet ermöglicht wird.
							</li>
							<li>
								Ebenfalls können wir den Dienst „Google Optimizer“ einsetzen.
								Google Optimizer erlaubt uns im Rahmen so genannten
								„A/B-Testings“ nachzuvollziehen, wie sich verschiedene
								Änderungen einer Website auswirken (z.B. Veränderungen der
								Eingabefelder, des Designs, etc.). F
								<strong>
									ür diese Testzwecke werden Cookies auf den Geräten der Nutzer
									abgelegt. Dabei werden nur pseudonyme Daten der Nutzer
									verarbeitet.
								</strong>
							</li>
							<li>
								Ferner können wir den „Google Tag Manager“ einsetzen, um die
								Google Analyse- und Marketing-Dienste in unsere Website
								einzubinden und zu verwalten.
							</li>
							<li>
								Weitere Informationen zur Datennutzung zu Marketingzwecken durch
								Google, erfahren Sie auf der Übersichtsseite:
								<a
									rel="nofollow"
									href="https://policies.google.com/technologies/ads"
								>
									https://policies.google.com/technologies/ads
								</a>
								, die Datenschutzerklärung von Google ist unter{' '}
								<a rel="nofollow" href="https://policies.google.com/privacy">
									https://policies.google.com/privacy
								</a>
							</li>
							<li>
								Wenn Sie der interessensbezogenen Werbung durch
								Google-Marketing-Services widersprechen möchten, können Sie die
								von Google gestellten Einstellungs- und Opt-Out-Möglichkeiten
								nutzen:
								<a
									rel="nofollow"
									href="https://adssettings.google.com/authenticated"
								>
									https://adssettings.google.com/authenticated
								</a>
								.
							</li>
						</ul>
					</li>
					<li>
						Die Verarbeitung der Daten durch Facebook erfolgt im Rahmen von
						Facebooks Datenverwendungsrichtlinie. Dementsprechend generelle
						Hinweise zur Darstellung von Facebook-Ads, in der
						Datenverwendungsrichtlinie von Facebook:
						<a rel="nofollow" href="https://www.facebook.com/policy.php">
							https://www.facebook.com/policy.php
						</a>
						. Spezielle Informationen und Details zum Facebook-Pixel und seiner
						Funktionsweise erhalten Sie im Hilfebereich von Facebook:{' '}
						<a
							rel="nofollow"
							href="https://www.facebook.com/business/help/651294705016616"
						>
							https://www.facebook.com/business/help/651294705016616
						</a>
						.
					</li>
					<li>
						Sie können der Erfassung durch den Facebook-Pixel und Verwendung
						Ihrer Daten zur Darstellung von Facebook-Ads widersprechen. Um
						einzustellen, welche Arten von Werbeanzeigen Ihnen innerhalb von
						Facebook angezeigt werden, können Sie die von Facebook eingerichtete
						Seite aufrufen und dort die Hinweise zu den Einstellungen
						nutzungsbasierter Werbung befolgen:
						<a rel="nofollow" href="https://www.facebook.com/settings?tab=ads">
							https://www.facebook.com/settings?tab=ads
						</a>
						. Die Einstellungen erfolgen plattformunabhängig, d.h. sie werden
						für alle Geräte, wie Desktopcomputer oder mobile Geräte übernommen.
					</li>
					<li>
						Um die Erfassung Ihrer Daten mittels des Facebook-Pixels auf unserer
						Webseite zu verhindern, klicken Sie bitten den folgenden Link:{' '}
						<a href="javascript:gtmOptOut();alert('Vielen Dank. Ihr Opt-Out war erfolgreich.');">
							Facebook-Opt-Out
						</a>{' '}
						Hinweis: Wenn Sie den Link klicken, wird ein „Opt-Out“-Cookie auf
						Ihrem Gerät gespeichert. Wenn Sie die Cookies in diesem Browser
						löschen, dann müssen Sie den Link erneut klicken. Ferner gilt das
						Opt-Out nur innerhalb des von Ihnen verwendeten Browsers und nur
						innerhalb unserer Webdomain, auf der der Link geklickt wurde.
					</li>
					<li>
						Sie können dem Einsatz von Cookies, die der Reichweitenmessung und
						Werbezwecken dienen, ferner über die Deaktivierungsseite der
						Netzwerkwerbeinitiative (
						<a rel="nofollow" href="http://optout.networkadvertising.org/">
							http://optout.networkadvertising.org/
						</a>
						) und zusätzlich die US-amerikanische Webseite(
						<a rel="nofollow" href="http://www.aboutads.info/choices">
							http://www.aboutads.info/choices
						</a>
						) oder die europäische Webseite (
						<a
							rel="nofollow"
							href="http://www.youronlinechoices.com/uk/your-ad-choices/"
						>
							http://www.youronlinechoices.com/uk/your-ad-choices/
						</a>
						) widersprechen.
					</li>

					<li>
						<strong>Newsletter</strong>
						<ul>
							<li>
								Mit den nachfolgenden Hinweisen informieren wir Sie über die
								Inhalte unseres Newsletters sowie das Anmelde-, Versand- und das
								statistische Auswertungsverfahren sowie Ihre Widerspruchsrechte
								auf. Indem Sie unseren Newsletter abonnieren, erklären Sie sich
								mit dem Empfang und den beschriebenen Verfahren einverstanden.
							</li>
							<li>
								Inhalt des Newsletters: Wir versenden Newsletter, E-Mails und
								weitere elektronische Benachrichtigungen mit werblichen
								Informationen (nachfolgend „Newsletter“) nur mit der
								Einwilligung der Empfänger oder einer gesetzlichen Erlaubnis.
								Sofern im Rahmen einer Anmeldung zum Newsletter dessen Inhalte
								konkret umschrieben werden, sind sie für die Einwilligung der
								Nutzer maßgeblich. Im Übrigen enthalten unsere Newsletter
								Informationen zu unseren Produkten, Angeboten, Aktionen und
								unserem Unternehmen.
							</li>
							<li>
								Double-Opt-In und Protokollierung: Die Anmeldung zu unserem
								Newsletter erfolgt in einem sog. Double-Opt-In-Verfahren. D.h.
								Sie erhalten nach der Anmeldung eine E-Mail, in der Sie um die
								Bestätigung Ihrer Anmeldung gebeten werden. Diese Bestätigung
								ist notwendig, damit sich niemand mit fremden E-Mailadressen
								anmelden kann. Die Anmeldungen zum Newsletter werden
								protokolliert, um den Anmeldeprozess entsprechend den
								rechtlichen Anforderungen nachweisen zu können. Hierzu gehört
								die Speicherung des Anmelde- und des Bestätigungszeitpunkts, als
								auch der IP-Adresse. Ebenso werden die Änderungen Ihrer bei dem
								Versanddienstleister gespeicherten Daten protokolliert.
							</li>
							<li>
								Versanddienstleister: Der Versand der Newsletter erfolgt mittels
								„MailChimp“, einer Newsletterversandplattform des US-Anbieters
								Rocket Science Group, LLC, 675 Ponce De Leon Ave NE #5000,
								Atlanta, GA 30308, USA. Die Datenschutzbestimmungen des
								Versanddienstleisters können Sie hier einsehen:{' '}
								<a href="https://mailchimp.com/legal/privacy/">
									https://mailchimp.com/legal/privacy/
								</a>
								. The Rocket Science Group LLC d/b/a MailChimp ist unter dem
								Privacy-Shield-Abkommen zertifiziert und bietet hierdurch eine
								Garantie, das europäisches Datenschutzniveau einzuhalten (
								<a href="https://www.privacyshield.gov/participant?id=a2zt0000000TO6hAAG&amp;status=Active">
									https://www.privacyshield.gov/participant?id=a2zt0000000TO6hAAG&amp;status=Active
								</a>
								).
							</li>
							<li>
								Des Weiteren kann der Versanddienstleister nach eigenen
								Informationen diese Daten in pseudonymer Form, d.h. ohne
								Zuordnung zu einem Nutzer, zur Optimierung oder Verbesserung der
								eigenen Services nutzen, z.B. zur technischen Optimierung des
								Versandes und der Darstellung der Newsletter oder für
								statistische Zwecke, um zu bestimmen aus welchen Ländern die
								Empfänger kommen, verwenden. Der Versanddienstleister nutzt die
								Daten unserer Newsletterempfänger jedoch nicht, um diese selbst
								anzuschreiben oder an Dritte weiterzugeben.
							</li>
							<li>
								Anmeldedaten: Um sich für den Newsletter anzumelden, reicht es
								aus, wenn Sie Ihre E-Mailadresse angeben. Optional bitten wir
								Sie einen Namen, zwecks persönlicher Ansprache im Newsletters
								anzugeben.
							</li>
							<li>
								Erfolgsmessung – Die Newsletter enthalten einen sog.
								„web-beacon“, d.h. eine pixelgroße Datei, die beim Öffnen des
								Newsletters von dem Server des Versanddienstleisters abgerufen
								wird. Im Rahmen dieses Abrufs werden zunächst technische
								Informationen, wie Informationen zum Browser und Ihrem System,
								als auch Ihre IP-Adresse und Zeitpunkt des Abrufs erhoben. Diese
								Informationen werden zur technischen Verbesserung der Services
								anhand der technischen Daten oder der Zielgruppen und ihres
								Leseverhaltens anhand derer Abruforte (die mit Hilfe der
								IP-Adresse bestimmbar sind) oder der Zugriffszeiten genutzt. Zu
								den statistischen Erhebungen gehört ebenfalls die Feststellung,
								ob die Newsletter geöffnet werden, wann sie geöffnet werden und
								welche Links geklickt werden. Diese Informationen können aus
								technischen Gründen zwar den einzelnen Newsletterempfängern
								zugeordnet werden. Es ist jedoch weder unser Bestreben, noch das
								des Versanddienstleisters, einzelne Nutzer zu beobachten. Die
								Auswertungen dienen uns viel mehr dazu, die Lesegewohnheiten
								unserer Nutzer zu erkennen und unsere Inhalte auf sie anzupassen
								oder unterschiedliche Inhalte entsprechend den Interessen
								unserer Nutzer zu versenden.
							</li>
							<li>
								Deutschland: Der Versand des Newsletters und die Erfolgsmessung
								erfolgen auf Grundlage einer Einwilligung der Empfänger gem. 6
								Abs. 1 lit. a, Art. 7 DSGVO i.V.m § 7 Abs. 2 Nr. 3 UWG bzw. auf
								Grundlage der gesetzlichen Erlaubnis gem. § 7 Abs. 3 UWG.
							</li>
							<li>
								Die Protokollierung des Anmeldeverfahrens erfolgt auf Grundlage
								unserer berechtigten Interessen gem. Art. 6 Abs. 1 lit. f DSGVO
								und dient dem Nachweis der Einwilligung in den Empfang des
								Newsletters.
							</li>
							<li>
								Kündigung/Widerruf – Newsletterempfänger können den Empfang
								unseres Newsletters jederzeit kündigen, d.h. Ihre Einwilligungen
								widerrufen. Einen Link zur Kündigung des Newsletters finden sie
								am Ende eines jeden Newsletters. Damit erlöschen gleichzeitig
								ihre Einwilligungen in die Erfolgsmessung. Ein getrennter
								Widerruf der Erfolgsmessung ist leider nicht möglich, in diesem
								Fall muss das gesamte Newsletterabonnement gekündigt werden. Mit
								der Abmeldung von Newsletter, werden die personenbezogenen Daten
								gelöscht, es sei denn deren Aufbewahrung ist rechtlich geboten
								oder gerechtfertigt, wobei deren Verarbeitung in diesem Fall nur
								auf diese Ausnahmezwecke beschränkt wird. Wir können
								insbesondere die ausgetragenen E-Mailadressen bis zu drei Jahren
								auf Grundlage unserer berechtigten Interessen speichern bevor
								wir sie für Zwecke des Newsletterversandes löschen, um eine
								ehemals gegebene Einwilligung nachweisen zu können. Die
								Verarbeitung dieser Daten wird auf den Zweck einer möglichen
								Abwehr von Ansprüchen beschränkt. Ein individueller
								Löschungsantrag ist jederzeit möglich, sofern zugleich das
								ehemalige Bestehen einer Einwilligung bestätigt wird.
							</li>
						</ul>
					</li>
					<li>
						<strong>Einbindung von Diensten und Inhalten Dritter</strong>
						<ul>
							<li>
								Wir setzen innerhalb unseres Onlineangebotes auf Grundlage
								unserer berechtigten Interessen (d.h. Interesse an der Analyse,
								Optimierung und wirtschaftlichem Betrieb unseres Onlineangebotes
								im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Inhalts- oder
								Serviceangebote von Drittanbietern ein, um deren Inhalte und
								Services, wie z.B. Videos oder Schriftarten einzubinden
								(nachfolgend einheitlich bezeichnet als “Inhalte”). Dies setzt
								immer voraus, dass die Drittanbieter dieser Inhalte, die
								IP-Adresse der Nutzer wahrnehmen, da sie ohne die IP-Adresse die
								Inhalte nicht an deren Browser senden könnten. Die IP-Adresse
								ist damit für die Darstellung dieser Inhalte erforderlich. Wir
								bemühen uns nur solche Inhalte zu verwenden, deren jeweilige
								Anbieter die IP-Adresse lediglich zur Auslieferung der Inhalte
								verwenden. Drittanbieter können ferner so genannte Pixel-Tags
								(unsichtbare Grafiken, auch als „Web Beacons“ bezeichnet) für
								statistische oder Marketingzwecke verwenden. Durch die
								„Pixel-Tags“ können Informationen, wie der Besucherverkehr auf
								den Seiten dieser Website ausgewertet werden. Die pseudonymen
								Informationen können ferner in Cookies auf dem Gerät der Nutzer
								gespeichert werden und unter anderem technische Informationen
								zum Browser und Betriebssystem, verweisende Webseiten,
								Besuchszeit sowie weitere Angaben zur Nutzung unseres
								Onlineangebotes enthalten, als auch mit solchen Informationen
								aus anderen Quellen verbunden werden können.
							</li>
							<li>
								Die nachfolgende Darstellung bietet eine Übersicht von
								Drittanbietern sowie ihrer Inhalte, nebst Links zu deren
								Datenschutzerklärungen, welche weitere Hinweise zur Verarbeitung
								von Daten und, z.T. bereits hier genannt,
								Widerspruchsmöglichkeiten (sog. Opt-Out) enthalten:
								<ul>
									<li>
										Externe Schriftarten von Google, LLC.,
										https://www.google.com/fonts („Google Fonts“). Die
										Einbindung der Google Fonts erfolgt durch einen Serveraufruf
										bei Google (in der Regel in den USA). Datenschutzerklärung:{' '}
										<a
											rel="nofollow"
											href="https://policies.google.com/privacy"
										>
											https://policies.google.com/privacy
										</a>
										, Opt-Out:{' '}
										<a
											rel="nofollow"
											href="https://adssettings.google.com/authenticated"
										>
											https://adssettings.google.com/authenticated
										</a>
										.
									</li>
									<li>
										Landkarten des Dienstes „Google Maps“ des Drittanbieters
										Google Ireland Limited (Gordon House, Barrow Street, Dublin
										4, Irland) gestellt. Datenschutzerklärung:
										https://www.google.com/policies/privacy/, Opt-Out:
										https://www.google.com/settings/ads/.
									</li>
									<li>
										Videos der Plattform “YouTube” des Drittanbieters Google
										Ireland Limited (Gordon House, Barrow Street, Dublin 4,
										Irland). Datenschutzerklärung:{' '}
										<a
											rel="nofollow"
											href="https://policies.google.com/privacy"
										>
											https://policies.google.com/privacy
										</a>
										, Opt-Out:{' '}
										<a
											rel="nofollow"
											href="https://adssettings.google.com/authenticated"
										>
											https://adssettings.google.com/authenticated
										</a>
										.
									</li>
									<li>
										Externer CDN von Google LLC, z.B. Jquery. Die Einbindung des
										Google CDN erfolgt durch einen Serveraufruf bei Google (in
										der Regel in den USA). Datenschutzerklärung:{' '}
										<a
											rel="nofollow"
											href="https://www.google.com/policies/privacy/"
										>
											https://www.google.com/policies/privacy/
										</a>
										, Opt-Out:{' '}
										<a
											rel="nofollow"
											href="https://www.google.com/settings/ads/"
										>
											https://www.google.com/settings/ads/
										</a>
										.
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ol>
			</article>
		</>
	)
}

export default PrivacyPolicy
