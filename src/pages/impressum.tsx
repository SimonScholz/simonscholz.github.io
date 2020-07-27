import React from 'react'
import { SEO } from '../components/SEO'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

export const query = graphql`
	query flagQueryImpressum {
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

const Impressum = ({ data }: any): React.ReactElement => {
	return (
		<>
			<SEO title="Impressum" metaDescription="Impressum" />

			<div className="blog-post-content m-2 markdown flex flex-row">
				<a href="#impressum-en" className="flex flex-row mr-4">
					<Img
						fluid={data!.english!.childImageSharp!.fluid}
						alt="Avatar"
						className="w-12 h-8 mr-2"
					/>
					English Version
				</a>
				<a href="#impressum-de" className="flex flex-row">
					<Img
						fluid={data!.german!.childImageSharp!.fluid}
						alt="Avatar"
						className="w-12 h-8 mr-2"
					/>
					Deutsche Version
				</a>
			</div>

			<div id="impressum-en" className="blog-post-content m-2 markdown">
				<h1>Legal Disclosure</h1>
				Information in accordance with Section 5 TMG
				<br />
				Simon Scholz
				<br />
				Uckermarkweg 12a
				<br />
				22415 Hamburg
				<br />
				<h2>Contact Information</h2>
				Telephone: +49 176 - 43 622 060
				<br />
				E-Mail:{' '}
				<a href="mailto:opensource.simon@gmail.com">
					opensource.simon@gmail.com
				</a>
				<br />
				Internet address:{' '}
				<a href="www.simonscholz.com" target="_blank">
					www.simonscholz.com
				</a>
				<br />
				<br />
				<h2>Disclaimer</h2>
				Accountability for content
				<br />
				The contents of our pages have been created with the utmost care.
				However, we cannot guarantee the contents' accuracy, completeness or
				topicality. According to statutory provisions, we are furthermore
				responsible for our own content on these web pages. In this matter,
				please note that we are not obliged to monitor the transmitted or saved
				information of third parties, or investigate circumstances pointing to
				illegal activity. Our obligations to remove or block the use of
				information under generally applicable laws remain unaffected by this as
				per §§ 8 to 10 of the Telemedia Act (TMG).
				<br />
				<br />
				Accountability for links
				<br />
				Responsibility for the content of external links (to web pages of third
				parties) lies solely with the operators of the linked pages. No
				violations were evident to us at the time of linking. Should any legal
				infringement become known to us, we will remove the respective link
				immediately.
				<br />
				<br />
				Copyright
				<br /> Our web pages and their contents are subject to German copyright
				law. Unless expressly permitted by law, every form of utilizing,
				reproducing or processing works subject to copyright protection on our
				web pages requires the prior consent of the respective owner of the
				rights. Individual reproductions of a work are only allowed for private
				use. The materials from these pages are copyrighted and any unauthorized
				use may violate copyright laws.
				<br />
				<br />
				<i>Quelle: </i>
				<a href="http://www.translate-24h.de" target="_blank">
					Deutsch-Englisch Übersetzungen
				</a>{' '}
				<br />
				<br />
			</div>

			<div
				id="impressum-de"
				className="blog-post-content m-2 markdown border-t-2"
			>
				<h1>Impressum</h1>
				<p>Angaben gemäß § 5 TMG</p>
				<p>
					Simon Scholz <br />
					Uckermarkweg 12a
					<br />
					22415 Hamburg <br />
				</p>
				<p>
					{' '}
					<strong>Vertreten durch: </strong>
					<br />
					Simon Scholz
					<br />
				</p>
				<p>
					<strong>Kontakt:</strong> <br />
					Telefon: +49 176 - 43 622 060
					<br />
					E-Mail:{' '}
					<a href="opensource.simon@gmail.com">opensource.simon@gmail.com</a>
					<br />
				</p>
				<p className="hidden">
					<strong>Umsatzsteuer-ID: </strong> <br />
					Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
					Musterustid.
					<br />
					<br />
					<strong>Wirtschafts-ID: </strong>
					<br />
					Musterwirtschaftsid
					<br />
				</p>
				<p className="hidden">
					<strong>Aufsichtsbehörde:</strong>
					<br />
					Musteraufsicht Musterstadt
					<br />
				</p>
				<p>
					<strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong>
					<p>
						Simon Scholz <br />
						Uckermarkweg 12a
						<br />
						22415 Hamburg <br />
					</p>
				</p>
				<p>
					<strong>Haftungsausschluss: </strong>
					<br />
					<br />
					<strong>Haftung für Inhalte</strong>
					<br />
					<br />
					Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
					die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
					jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
					Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
					Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
					Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
					gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
					forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
					Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
					Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
					Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
					Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
					von entsprechenden Rechtsverletzungen werden wir diese Inhalte
					umgehend entfernen.
					<br />
					<br />
					<strong>Haftung für Links</strong>
					<br />
					<br />
					Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
					Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
					fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
					verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
					Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
					Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
					Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
					permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
					konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
					Bekanntwerden von Rechtsverletzungen werden wir derartige Links
					umgehend entfernen.
					<br />
					<br />
					<strong>Urheberrecht</strong>
					<br />
					<br />
					Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
					Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
					Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
					Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
					jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
					sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
					Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
					wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
					Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
					eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
					entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
					werden wir derartige Inhalte umgehend entfernen.
					<br />
					<br />
					<strong>Datenschutz</strong>
					<br />
					<br />
					Die Nutzung unserer Webseite ist in der Regel ohne Angabe
					personenbezogener Daten möglich. Soweit auf unseren Seiten
					personenbezogene Daten (beispielsweise Name, Anschrift oder
					eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
					auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
					Zustimmung nicht an Dritte weitergegeben. <br />
					Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei
					der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
					lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
					möglich. <br />
					Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
					Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
					angeforderter Werbung und Informationsmaterialien wird hiermit
					ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
					ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung
					von Werbeinformationen, etwa durch Spam-Mails, vor.
					<br />
					<br />
					<br />
					<strong>Google Analytics</strong>
					<br />
					<br />
					Diese Website benutzt Google Analytics, einen Webanalysedienst der
					Google Inc. (''Google''). Google Analytics verwendet sog. ''Cookies'',
					Textdateien, die auf Ihrem Computer gespeichert werden und die eine
					Analyse der Benutzung der Website durch Sie ermöglicht. Die durch den
					Cookie erzeugten Informationen über Ihre Benutzung dieser Website
					(einschließlich Ihrer IP-Adresse) wird an einen Server von Google in
					den USA übertragen und dort gespeichert. Google wird diese
					Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um
					Reports über die Websiteaktivitäten für die Websitebetreiber
					zusammenzustellen und um weitere mit der Websitenutzung und der
					Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird
					Google diese Informationen gegebenenfalls an Dritte übertragen, sofern
					dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im
					Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre
					IP-Adresse mit anderen Daten der Google in Verbindung bringen. Sie
					können die Installation der Cookies durch eine entsprechende
					Einstellung Ihrer Browser Software verhindern; wir weisen Sie jedoch
					darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche
					Funktionen dieser Website voll umfänglich nutzen können. Durch die
					Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über
					Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und
					Weise und zu dem zuvor benannten Zweck einverstanden.
					<br />
					<br />
					<strong>Google AdSense</strong>
					<br />
					<br />
					Diese Website benutzt Google Adsense, einen Webanzeigendienst der
					Google Inc., USA (''Google''). Google Adsense verwendet sog.
					''Cookies'' (Textdateien), die auf Ihrem Computer gespeichert werden
					und die eine Analyse der Benutzung der Website durch Sie ermöglicht.
					Google Adsense verwendet auch sog. ''Web Beacons'' (kleine unsichtbare
					Grafiken) zur Sammlung von Informationen. Durch die Verwendung des Web
					Beacons können einfache Aktionen wie der Besucherverkehr auf der
					Webseite aufgezeichnet und gesammelt werden. Die durch den Cookie
					und/oder Web Beacon erzeugten Informationen über Ihre Benutzung dieser
					Website (einschließlich Ihrer IP-Adresse) werden an einen Server von
					Google in den USA übertragen und dort gespeichert. Google wird diese
					Informationen benutzen, um Ihre Nutzung der Website im Hinblick auf
					die Anzeigen auszuwerten, um Reports über die Websiteaktivitäten und
					Anzeigen für die Websitebetreiber zusammenzustellen und um weitere mit
					der Websitenutzung und der Internetnutzung verbundene Dienstleistungen
					zu erbringen. Auch wird Google diese Informationen gegebenenfalls an
					Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit
					Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in
					keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung
					bringen. Das Speichern von Cookies auf Ihrer Festplatte und die
					Anzeige von Web Beacons können Sie verhindern, indem Sie in Ihren
					Browser-Einstellungen ''keine Cookies akzeptieren'' wählen (Im MS
					Internet-Explorer unter ''Extras > Internetoptionen > Datenschutz >
					Einstellung''; im Firefox unter ''Extras > Einstellungen > Datenschutz
					> Cookies''); wir weisen Sie jedoch darauf hin, dass Sie in diesem
					Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll
					umfänglich nutzen können. Durch die Nutzung dieser Website erklären
					Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google
					in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten
					Zweck einverstanden.
				</p>
				<br />
				Impressum vom{' '}
				<a href="https://www.impressum-generator.de">
					Impressum Generator
				</a> der{' '}
				<a href="https://www.kanzlei-hasselbach.de/standorte/bonn/">
					Kanzlei Hasselbach, Bonn
				</a>
			</div>
		</>
	)
}

export default Impressum
