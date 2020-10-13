//animating the hamburger menu
var hamburger = document.querySelector('#hamburger');
var nav = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
	nav.classList.toggle('nav-active');
	Array.from(navLinks).forEach( (li, index) => {
		if (li.style.animation){
			li.style.animation = '';
		}else {
			li.style.animation = `navFade 0.5s forwards ${index / 7 + .5}s`
		}
	})
})


// attempt to make an SPA
var body = document.querySelector('section');
var home = document.querySelector('#home');
var howto = document.querySelector('#howto');

home.addEventListener('click', showHome);
howto.addEventListener('click', showHowto);

// 
let answer = document.querySelector('#answer');
	let form = document.querySelector('form');
	form.addEventListener('submit', getLink);
	var url;


async function getLink(e){
		e.preventDefault();
		url = document.querySelector('#url').value;
		//url validation
		const regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
		if(regex.test(url)){
			let link = url;
			link = link.trim();
			let hyperlink = link.slice(0, 3);
			if (hyperlink === 'www') {
				link = 'https://' + link.slice(4);
			}else if (hyperlink !=='htt') {
				window.alert('Invalid URL (www.example.com, htttp://example.com, smtp://example.com');
				document.querySelector('#url').value ='';
				return;
			}
			const response = await fetch(`https://rel.ink/api/links/?url=${link}`, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({ url: `${link}` })
				});
				const json = await response.json();
				console.log(json);
				const shortUrl = 'https://rel.ink/' + json.hashid;
				const longUrl = json.url;
				console.log(shortUrl);
				let miniUrl = `<p id="url4copy"><a href=${shortUrl} target = '_blank'>${shortUrl}</a></p>`;
				answer.innerHTML = '<p>Your shortened URL is:'+ miniUrl;
				answer.style.visibility = 'visible';
				CopyToClipboard('url4copy');
				alert('Your URL is ready');

		}else{
			window.alert('Invalid URL (www.example.com, htttp://example.com, smtp://example.com');
		};
		document.querySelector('#url').value ='';
	}


	function CopyToClipboard(id){
	var r = document.createRange();
	r.selectNode(document.getElementById(id));
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(r);
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
	};


function showHome(e){
	e.preventDefault();
	body.innerHTML = `<label id="main-label">URL shortener</label>
		<p id="sub-label">secure and reliable urls via <a href="https://rel.ink/" target="_blank" >Rel.link API</a></p>
		<form>
			<input type="text" name="url" placeholder="Enter url here..." id="url">
			<input type="submit" name="submit" value="Shorten" id="shorten">
		</form>

		<div id="answer">
		</div>`;

	//getting user input
	let answer = document.querySelector('#answer');
	let form = document.querySelector('form');
	form.addEventListener('submit', getLink);
	var url;

	async function getLink(e){
		e.preventDefault();
		url = document.querySelector('#url').value;
		//url validation
		const regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
		if(regex.test(url)){
			let link = url;
			link = link.trim();
			let hyperlink = link.slice(0, 3);
			if (hyperlink === 'www') {
				link = 'https://' + link.slice(4);
			}else if (hyperlink !=='htt') {
				window.alert('Invalid URL (www.example.com, htttp://example.com, smtp://example.com');
				document.querySelector('#url').value ='';
				return;
			}
			const response = await fetch(`https://rel.ink/api/links/?url=${link}`, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({ url: `${link}` })
				});
				const json = await response.json();
				console.log(json);
				const shortUrl = 'https://rel.ink/' + json.hashid;
				const longUrl = json.url;
				console.log(shortUrl);
				let miniUrl = `<p id="url4copy"><a href=${shortUrl} target = '_blank'>${shortUrl}</a></p>`;
				answer.innerHTML = '<p>Your shortened URL is:'+ miniUrl;
				answer.style.visibility = 'visible';
				CopyToClipboard('url4copy');
				alert('Your URL is ready');

		}else{
			window.alert('Invalid URL (www.example.com, htttp://example.com, smtp://example.com');
		};
		document.querySelector('#url').value ='';
	}


	function CopyToClipboard(id){
	var r = document.createRange();
	r.selectNode(document.getElementById(id));
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(r);
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
	};

	function CopyToClipboard(id){
	var r = document.createRange();
	r.selectNode(document.getElementById(id));
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(r);
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
	};

}

function showHowto(e){
	e.preventDefault();
	body.innerHTML = `<label id="howto-label">HOW TO USE THIS APP</label>
		<div id="howto-div">
			<ul>
				<li>
					<div>
						<p>Copy the URL from your Address bar</p>
						<img src="img/copy.png" class="copyImg">
					</div>
				</li>
				<li>
					<div>
						<p>Paste the URL into the app</p>
						<img src="img/bar.png" class="copyImg">
					</div>
				</li>
				<li>
					<div>
						<p>Shorten the URL</p>
						<img src="img/click.png" class="copyImg">
					</div>
				</li>
			</ul>
		</div>`;
}
