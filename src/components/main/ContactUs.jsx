import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./contactus.css";
function ContactUs() {
	const form = useRef();
	const position = [27.1770706, 31.1669084];

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_6vsg4nb",
				"template_75aeqqj",
				form.current,
				"HRGxnfaCrsv1Q4KW4"
			)
			.then(
				(result) => {
					toast.success("Message Sent Successfully");
					console.log(result.text);
				},
				(error) => {
					toast.error(error.text);
					console.log(error.text);
				}
			);
		e.target.reset();
	};
	return (
		<div className="row">
			<div className="col col-md-6">
				<form ref={form} onSubmit={(e) => sendEmail(e)}>
					<div className="contact-conatiner">
						<label>Name</label>
						<input
							type="text"
							name="user_name"
							placeholder="Full Name"
							required
						/>
						<label>Email</label>
						<input
							type="email"
							name="user_email"
							placeholder="Your active email"
							required
						/>
						<label>Subject</label>
						<input type="text" name="subject" placeholder="Subject" required />
						<label>Message</label>
						<textarea name="message" cols="30" rows="10"></textarea>
						<button type="submit" className="btn btn-outline-primary">
							Send Message
						</button>
					</div>
				</form>
			</div>
			<div className="col col-md-6">
				<div className="map-wrapper">
					<MapContainer center={position} zoom={15} scrollWheelZoom={false}>
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						<Marker position={position}>
							<Popup>Moutaz Lives here, come up for a cup of tea 😃😃😃</Popup>
						</Marker>
					</MapContainer>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
