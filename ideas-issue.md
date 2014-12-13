> Drum machines are cool. What about creatin MGM videos with the idea of a drum machine?

[![mgm-4](https://cloud.githubusercontent.com/assets/3574444/5232075/8789bcca-772d-11e4-8d3f-2f1ab7772828.png)](https://www.youtube.com/watch?v=Ul95hTnO3h4)

Uma das ideias de drum machine é que você possa assinalar a botões algum tipo de som que você então toca ao vivo ao apertar o botão ou então faz o esquema de repetir de acordo com o BPM settado. @MateusZitelli tinha dado a ideia de gravar trechos de video lá na ideia #4 . Porquê não juntar a ideia de drummachine com video também e permitir que o usuário crie um video estilo mgm?

(*tava funçando mais videos dele e na vdd essa ideia meio que foi implementada em um video dele mas em uma simplicidade bem maior - [beat it!](https://www.youtube.com/watch?v=2_sNpaboK_g)*)

## Função Crítica

Gravar trechos de som e video, podendo alinhar direitinho, cortar pedaços e assimilar isso tudo.
Seria bacana poder compor os videos juntos e tal que nem ele faz:

[Impossible - Stop Motion Music Short](https://www.youtube.com/watch?v=MuU00Q3RhDg)
![mgm](https://cloud.githubusercontent.com/assets/3574444/5231976/c0797cf8-772a-11e4-97ac-0541d993f6fb.png)

ah sim, o clássico [Vuvuzela Symphony](https://www.youtube.com/watch?v=xB0pS3rPbwA)

![mgm-3](https://cloud.githubusercontent.com/assets/3574444/5232030/ed639446-772b-11e4-9d60-3a1cd84606db.png)

### Technically

https://github.com/streamproc/MediaStreamRecorder
http://ericbidelman.tumblr.com/post/31486670538/creating-webm-video-from-getusermedia
https://github.com/mozilla/popcorn-js

## O que já existe

A mozilla tem o [popcorn.webmaker](https://popcorn.webmaker.org/) que é super bem executado, mas para a nossa finalidade não serviria (um video por vez sendo mostrado), afinal não é o foco do mesmo. Acho que para ter algum sucesso e conquistar algo aí no hackernews, até mesmo tentar algum contato com o próprio Joe Penna (o criador do MGM) teria que ter algo BEM simples e fácil de se utilizar focando SÓ em produzir videos de tal tipo. 

https://github.com/mozilla/popcorn.webmaker.org

## My thoughts

para mim até então me parece a ideia mais divertida!

~~E óbvio, da para tornar colaborativo com um peerjs e etc, dependendo do grau de completude que consigamos em X tempo (podemos mensurar isso antes - ver o quão difícil é realizar a função crítica)~~ pesquisando melhor acho que o que vale é executar super bem o processo. Acho que se algo de P2P tenha de se feito, que seja quanto à gravação de vídeo (p.ex, gravo com o celular, que está na rede e então transmito para o meu computador que também está na rede. Acho válido isso já que gravar com a webcam do PC pode vir a ser uma merda)
