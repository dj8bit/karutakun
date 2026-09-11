$(function () {
	const apikey = 'l365S-4-V-85809';
	let speakers = [];
	let speaker = '0';
	let deferredPrompt;

	// PWAインストール促進
	window.addEventListener('beforeinstallprompt', (e) => {
		console.log('PWAインストール可能になりました');
		e.preventDefault();
		deferredPrompt = e;
		
		// インストールボタンを表示
		if (!$('#installButton').length) {
			const installButton = $('<button id="installButton" style="position: fixed; top: 20px; right: 20px; z-index: 1000; background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-size: 14px;">📱 アプリをインストール</button>');
			$('body').append(installButton);
			
			installButton.click(() => {
				if (deferredPrompt) {
					deferredPrompt.prompt();
					deferredPrompt.userChoice.then((choiceResult) => {
						if (choiceResult.outcome === 'accepted') {
							console.log('PWAインストール成功');
						} else {
							console.log('PWAインストール拒否');
						}
						deferredPrompt = null;
						installButton.remove();
					});
				}
			});
		}
	});

	// PWAがインストールされた時の処理
	window.addEventListener('appinstalled', () => {
		console.log('PWAがインストールされました');
		$('#installButton').remove();
	});

	// PWAインストール要件のチェック
	function checkPWARequirements() {
		console.log('PWA要件チェック開始');
		
		// HTTPSチェック
		if (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
			console.log('✅ HTTPS/ローカルホスト要件を満たしています');
		} else {
			console.log('❌ HTTPSが必要です');
		}
		
		// Service Workerチェック
		if ('serviceWorker' in navigator) {
			console.log('✅ Service Worker対応');
		} else {
			console.log('❌ Service Worker非対応');
		}
		
		// マニフェストチェック
		if (document.querySelector('link[rel="manifest"]')) {
			console.log('✅ マニフェストファイル存在');
		} else {
			console.log('❌ マニフェストファイルが見つかりません');
		}
		
		// アイコンチェック
		const icons = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]');
		if (icons.length > 0) {
			console.log('✅ アイコン設定済み');
		} else {
			console.log('❌ アイコンが設定されていません');
		}
	}
	
	// ページ読み込み後にPWA要件をチェック
	$(document).ready(() => {
		setTimeout(checkPWARequirements, 1000);
	});

	$.ajax({
		url: 'https://deprecatedapis.tts.quest/v2/voicevox/speakers/',
		type: 'POST',
		data: {
			'key': apikey
		}
	}).done((data) => {
		speakers = data;

		$.each(speakers, (i, o) => {
			$('#speakerSelect').append('<option value="' + String(i) + '">' + o.name + '</option>');
		});
	}).fail((jqXHR, textStatus, errorThrown) => {
		alert('Ajax通信に失敗しました。');
	});

	// よむ人を選んだ時に名前を再生する機能を追加
	$('#speakerSelect').on('change', function() {
		const selectedIndex = $(this).val();
		if (selectedIndex && speakers[selectedIndex]) {
			const speakerName = speakers[selectedIndex].name;
			// 一時的な音声要素を作成して名前を再生
			const tempAudio = $('<audio>').attr('src', 
				'https://deprecatedapis.tts.quest/v2/voicevox/audio/?text=' + encodeURIComponent(speakerName) + 
				'&key=' + apikey + '&speaker=' + selectedIndex
			);
			$('body').append(tempAudio);
			tempAudio[0].play();
			// 再生後に要素を削除
			tempAudio.on('ended', function() {
				tempAudio.remove();
			});
		}
	});

	$.ajax({
		url: 'https://deprecatedapis.tts.quest/v2/api/',
		type: 'POST',
		data: {
			'key': apikey
		}
	}).done((data) => {
		console.log(data.points);
	}).fail((jqXHR, textStatus, errorThrown) => {
		alert('Ajax通信に失敗しました。');
	});

	const karutaText = {
		"ぐりとぐら": [
			'青い帽子、赤い帽子、ぐりとぐら',
			'苺が一杯、おいしそう',
			'うさぎのギック、海に出る',
			'襟巻巻いた、駅長さん',
			'おしくらまんじゅう、押せ押せ狼',
			'からすの買い物、からかさ一本',
			'きつねくん、切符を持って汽車に乗る',
			'熊くん くすくす くすぐったい',
			'毛虫が編んだ、毛糸の腹巻き',
			'子豚 困って こんな顔',
			'逆立ち さすが、お猿のサーカス',
			'知らぬまに、 シルクハットに 白い鳩',
			'すずめ 澄まして すみれの冠',
			'せい伸びしながら 背比べ',
			'揃って行きたい空の旅',
			'体操したら、たちまちスマート',
			'ちょっぴり小さいこのチョッキ',
			'つららキラキラ、つきよに光る',
			'てんとう虫 テントに とまれ',
			'虎が 得意の トランポリン',
			'仲良し 泣いた、仲良く泣いた',
			'兄さん にこにこ、にんじん食べる',
			'濡れた長靴、脱いで かわかす',
			'猫トラ トラ猫 招き猫',
			'呑気な猪、野原で のんびり',
			'はてなふむ、「ははん」と分かる めい探偵',
			'羊が ひなたで 昼ごはん',
			'太って 膨らむ ふうふうお餅',
			'下手でも平気、元気に 歌え',
			'星が 欲しいと 吠える犬',
			'窓から お出かけ 魔法使い',
			'緑のライオン、耳まで 緑',
			'胸まで 伸びた 麦ばたけ',
			'眼鏡の下から 横目で目くばせ',
			'もうできたかと、も一度覗く',
			'やぎさん やっぱり 山が好き',
			'雪の日 愉快な 雪だるま',
			'汚した洋服、洗って よそゆき',
			'らくだ らくらく ラッパ吹く',
			'りすの リュックは りんごで一杯',
			'留守番いるかと イルカが 聞いた',
			'れんこん ひときれ、レモン ふた切れ',
			'蝋燭 六本、ろばさん六歳',
			'わにどん わははと 大笑い'
		],
		"ことわざかるた": [
			'我慢し続ければ、いいことがあるよ。石の上にも三年',
			'そんなことをしても、全く無駄だよ。焼け石に水',
			'専門の人に、任せるのがいいね。餅は餅屋',
			'ああ！そうだったのか！これでわかった！。目から鱗が落ちる',
			'似た者同士は、自然に集まる。類は友を呼ぶ',
			'悪いこと、隠したつもりでも見えてるよ。頭隠して尻隠さず',
			'近すぎて、かえって気付かないことがある。灯台もと暗し',
			'どれも大したレベルじゃないなあ。どんぐりの背比べ',
			'準備すれば、失敗しないよ。転ばぬ先の杖',
			'失敗と思ったら、かえって良かった。怪我の功名',
			'人のために、敢えて危険に飛び込む。火中の栗を拾う',
			'秘密はなぜか、洩れちゃうよ。壁に耳あり 障子に目あり',
			'思っているより、世界は広いよ。井の中のかわず 大海を知らず',
			'余計なことをしなけりゃ良かった。藪をつついて蛇を出す',
			'どっちにも使えなくて、中途半端。帯にみじかし 襷に長し',
			'甘やかすより、厳しく育てる。かわいい子には旅をさせよ',
			'強いのに、もっと強くなって、もはや無敵！。鬼に金棒',
			'じっさいには、まるで役に立たない。絵にかいた餅',
			'ちょっとのことで、すごく得する。海老で鯛を釣る',
			'見えないところで頑張るいい人。縁の下の力持ち',
			'似た者が、次々出てくる。雨後の筍',
			'あの人は、なんにも聞いてないよ。馬の耳に念仏',
			'長生きは、めでたいことだね。鶴は千年 亀は万年',
			'違いすぎて、比べられないよ。月とスッポン',
			'上手な人でも、たまにはしくじるよ。猿も木から落ちる',
			'悪いことが続いてつらいよ。泣きっ面に蜂',
			'もう、どうにもできない、好きにしてくれ！。まな板の鯉',
			'こっちが頑張っても、反応無いなあ。暖簾に腕押し',
			'ああいそがしい！誰か手伝ってよ！。猫の手も借りたい',
			'すらすらよくしゃべる人だなあ。立て板に水',
			'あれこれ言うより、さっさと証拠。論より証拠',
			'貧しい時でもやせ我慢。武士は食わねど高楊枝',
			'月日が過ぎるのは早いものだなあ。光陰矢の如し',
			'見た目より中身で選ぶよ。花より団子',
			'出遅れたけど、かえってラッキー。残り物には福がある',
			'本当にできる人は、自慢しないよ。能ある鷹は、爪を隠す',
			'とにかく大事なものを守るよ。背に腹は代えられぬ',
			'後始末して、綺麗に終わろう。立つ鳥跡を濁さず',
			'やってみたら、意外に簡単。案ずるより産むがやすし',
			'困っていたけど、ちょうど助かった。渡りに船',
			'そう何度も駄目じゃ、さすがに怒るよ。ほとけの顔も三度',
			'何度失敗してもくじけないよ。七転び八起き',
			'ああ、本当に勿体なかったなあ。逃がした魚は大きい',
			'こんなラッキー、あるんだなあ。棚から牡丹餅',
			'好きなものって、人それぞれ違う。蓼食う虫も好きずき',
			'何度も聞くより、一回見ればわかる。百聞は一見に如かず',
			'一人より三人のほうが、アイディア出るよ。三人寄れば文殊の知恵',
			'二ついっぺんに欲張っちゃダメ！。二兎を追う者はいっとをも得ず',
			'上手くいかなくて、ああもどかしい！。二階から目薬',
			'きちんとやるのが、結局早いよ。いそがば回れ'
		],
		"ゴロゴロイメージ都道府県": [
			'ホッカホカ 象だよ 北海道',
			'仰向け モリモリ 青森県',
			'イテテテ 岩だよ 岩手県',
			'右向き ギャッと竜 宮城県',
			'飽きたよ あくびだ 秋田県',
			'山が ヤッホー 山形県',
			'フクッとした カバ 福島県',
			'いばった キツネの 茨城県',
			'父ちゃん 笑うよ 栃木県',
			'ぐーんと 鳥飛ぶ 群馬県',
			'最新 ユーフォー 埼玉県',
			'ちびっこ バク転 千葉県',
			'跳ぶリス キョトキョト 東京都',
			'敵わん かつらだ 神奈川県',
			'ニーが 笑った 新潟県',
			'跳ぶ蝶 山 越え 富山県',
			'イチが 傾き 石川県',
			'膨らむ いいカギ 福井県',
			'山なら ここです 山梨県',
			'ながーい 喉見せ 長野県',
			'ギクッと プードル 岐阜県',
			'静かに 泳ぐ金魚 静岡県',
			'あっち向き 恐竜 愛知県',
			'見えるか 馬たち 三重県',
			'足形 アシカだ あっ 滋賀県',
			'恐怖の イモムシ 京都府',
			'おっさん 長靴 大阪府',
			'ヒョコヒョコ ひよこだ 兵庫県',
			'並んで 手は前 奈良県',
			'わー かわいい猫 和歌山県',
			'鳥とる トラだよ 鳥取県',
			'しまった 寝すぎた 島根県',
			'おっかあ つの出し 岡山県',
			'広ーい ショベルカー 広島県',
			'山の字 崩れて 山口県',
			'特殊な 魔女だよ 徳島県',
			'輝け グライダー 香川県',
			'エイッと ヒョウ跳び 愛媛県',
			'こっちに 曲がった 高知県',
			'フラフラ 踊りだ 福岡県',
			'下がった くちばし 佐賀県',
			'流れた 三角 長崎県',
			'熊とも お散歩 熊本県',
			'おーいた すべった 大分県',
			'耳の先 とんがり 宮崎県',
			'かごが 下向き 鹿児島県',
			'沖に 縄投げ 沖縄県'
		]
	};


	$.each(Object.keys(karutaText), (i, o) => {
		$('#karutaSelect').append('<option value="' + o + '">' + o + '</option>');
	});





	let fuda = [];
	let now = -1;



	const startKaruta = (e) => {
		if (!$('#karutaSelect').val()) {
			alert('かるたを えらんでください');
		} else {
			speaker = $('#speakerSelect').val();
			fuda = [...shuffleArray(karutaText[$('#karutaSelect').val()])];
			console.log(fuda);
			now = 0;
			
			// プログレスバーを初期化
			$('#progressBar').val(0);
			$('#progressText').text('0 / ' + fuda.length);
			
			nextKaruta();
			$('#outGame').hide();
			$('#inGame').show();
		}
	}

	const nextKaruta = (e) => {
		// プログレスバーとテキストを更新
		const progress = ((now + 1) / fuda.length) * 100;
		$('#progressBar').val(progress);
		$('#progressText').text((now + 1) + ' / ' + fuda.length);
		
		$('#nextButton').attr('disabled', true);
		setTimeout(() => {
			yomiage(fuda[now]);
		}, 1000 + (Math.random() * 2000));
		if (now == fuda.length) {
			stopKaruta();
		}
	}


	$('audio').on("ended", function () {
		$('#nextButton').attr('disabled', false);
		now++;
	});
	const stopKaruta = (e) => {
		$('#outGame').show();
		$('#inGame').hide();
		now = 0;
		
		// プログレスバーをリセット
		$('#progressBar').val(0);
		$('#progressText').text('0 / 0');
	}


	const yomiage = (text) => {
		/*
		if ('speechSynthesis' in window) {
			let uttr = new SpeechSynthesisUtterance();
			uttr.text = text;
			window.speechSynthesis.speak(uttr);
			uttr.onend = function (event) {
				$('#nextButton').attr('disabled', false);
			};
		} else {
			alert('Web Speech非対応ブラウザです');
		}
*/
		let src = 'https://deprecatedapis.tts.quest/v2/voicevox/audio/?text=' + text + '&key=l365S-4-V-85809&speaker=' + speaker;
		console.log(src);
		$('audio').attr('src', src);
	}


	const shuffleArray = (array) => {
		const cloneArray = [...array];
		const result = cloneArray.reduce((_, cur, idx) => {
			let rand = Math.floor(Math.random() * (idx + 1));
			cloneArray[idx] = cloneArray[rand]
			cloneArray[rand] = cur;
			return cloneArray
		});
		return result;
	}


	$('#startButton').click(startKaruta);
	$('#nextButton').click(nextKaruta);
	$('#stopButton').click(stopKaruta);
	stopKaruta(null);


});

