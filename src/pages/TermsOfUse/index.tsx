import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { useAuth } from '@hooks/useAuth';
import { Header } from '@components/Header';
import { ButtonRadio } from '@components/ButtonRadio';
import { 
  Container, 
  Content,
  TextBox,
  Title,
  SubTitleBox,
  SubTitle,
  Text,
  BulletBox,
  BulletPoint,
  BulletText,
  MarginBotton,
  ButtonContainer,
  TermsAlreadRead
} from './styles';

export function TermsOfUse({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const anonymousURL = 'anonymousURL';

  //==> MARCA TERMOS DE USO COMO LIDO
  const termsRead = (doc_id: string) => {
    firestore()
    .collection('players')
    .doc(doc_id)
    .update({
      termsOfUse: true,
    })
    .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Header
        title='Terms of Use'
        text='Leitura obrigatória'
        picture={user.profile ? user.profile : anonymousURL}
        headerSize={'small'}
        onPress={() => {
          if (user.termsOfUse) {
            navigation.openDrawer();
          } else {
            auth().signOut();
          }
        }}
      />
      <Content>
        <Title>TERMOS E CONDIÇÕES GERAIS DE USO DO APLICATIVO</Title>
        <TextBox>
          <Text>
            1.	Este Termo refere-se ao Aplicativo Schiavoni Poker House. 
            Ao navegar pelo app e usar as suas funcionalidades, você afirma
            que LEU, COMPREENDEU e CONCORDA com nossos Termos e Condições. 
            Estes Termos e Condições abrangem todos os aplicativos lançados 
            ou que venham a ser lançados no futuro e serviço de mensagens 
            relacionados. Caso você não concorde ou não tenha ficado 
            claro algum ponto, sugere-se que você NÃO NAVEGUE MAIS NELE e 
            SOLICITE O CANCELAMENTO DA SUA INSCRIÇÃO até que você tenha 
            sanado todas as suas dúvidas. Você poderá ainda a qualquer 
            tempo solicitar nova inscrição e aceitar os termos de uso para 
            se beneficiar deste serviço.
          </Text>
        </TextBox>
        <SubTitleBox>
          <SubTitle>
            TERMOS E CONDIÇÕES
          </SubTitle>
        </SubTitleBox>
        <TextBox>
          <Text>
            2.	Os Termos e Condições da Schiavoni Poker House regem o uso 
            deste aplicativo e todo o seu conteúdo. Estes Termos descrevem 
            as regras e regulamentos que orientam sua participação como 
            membro ativo da Schiavoni Poker House, cuja sede está localizada 
            na rua Norma Maria Belini, 56, Iguatemi, Ribeirão Preto, sp. 
            Todos os equipamentos, informações e serviços utilizados nas 
            atividades, interações e competições organizadas pela Casa serão 
            administrados de acordo com estes Termos e Condições.
          </Text>
        </TextBox>
        <TextBox>
          <Text>
            ATENÇÃO: Não continue a usar este aplicativo se você tiver qualquer 
            objeção a qualquer um dos Termos e Condições declarados nesta página.
          </Text>
        </TextBox>
        <TextBox>
          <Text>
            3.	O aplicativo é destinado a usuários com 18 (dezoito) anos de 
            idade ou mais. Se você tem menos de 18 (dezoito) anos, não poderá 
            usar ou ser registrado para usar este aplicativo ou seus serviços 
            sem a permissão ou consentimento dos pais e dos membros integrantes 
            e ativos da Casa.  
            Ao concordar com estes Termos e Condições, você tem a capacidade 
            legal necessária para cumprir e ficar vinculado por estes Termos 
            e Condições.
          </Text>
        </TextBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            A Schiavoni Poker House constitui-se um clube privado com ambiênte 
            EXCLUSIVAMENTE MASCULINO, sendo terminantemente vedado o convite, 
            inclusão e/ou participação de pessoa do gênero feminino, 
            cabendo às esposas, mães e/ou responsáveis apenas a concessão do 
            Vale Nigth aos seus respectivos comandados.
          </BulletText>
        </BulletBox>
        <TextBox>
          <Text>
            4.	A Schiavoni Poker House não faz uso de cookies. Em contrapartida
            estão liberados aperitivos, petiscos, porções, espetinhos, pratos 
            elaborados e bebibas alcólicas em geral nas dependências da Casa, 
            inclusive durante a realização dos eventos.
          </Text>
        </TextBox>
        <TextBox>
          <Text>
            5.	Schiavoni Poker House detêm os direitos de propriedade 
            intelectual de todo o conteúdo. Todos os direitos de propriedade 
            intelectual são reservados. Você pode acessar qualquer conteúdo 
            do aplicativo a depender do status que lhe foi conferido no ato 
            da sua inscrição para seu uso pessoal, sujeito às restrições 
            definidas nestes Termos e Condições.
          </Text>
        </TextBox>
        <SubTitleBox>
          <SubTitle>
            PROIBIÇÕES
          </SubTitle>
        </SubTitleBox>
        <TextBox>
          <Text>
            6.	Schiavoni Poker House, por meio deste, determina que o usuário 
            do aplicativo e membro associado não cometa as seguintes ações:
          </Text>
        </TextBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Reproduzir, publicar, duplicar ou copiar qualquer conteúdo da 
            Schiavoni Poker House em redes sociais sem o consentimento de 
            todos os seus associados.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Executar e/ou exibir publicamente qualquer conteúdo do aplicativo 
            Schiavoni Poker House.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Usar este aplicativo de forma que prejudique ou afete o acesso de 
            outros usuários.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Usar esta plataforma de forma que seja contrária às regras, leis 
            e regulamentos da LGPD – Lei Geral de Proteção de Dados.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Bater o portão de acesso a sala de jogo da Schiavoni Poker 
            House, localizada na rua Norma Maria Belini, 56, Iguatemi, 
            Ribeirão Preto, SP, devido a algum revés esportivo, bad beat 
            e/ou desentendimento com os demais associados.
          </BulletText>
        </BulletBox>
        <TextBox>
          <Text>
            7.	Áreas específicas deste aplicativo podem ser restritas ao 
            acesso do usuário, cabendo a Schiavoni Poker House, na figura 
            do seu presidente, senhor Eduardo Schiavoni Restino, restringir 
            ou estender essa restrição, a qualquer momento e a seu exclusivo 
            critério. Qualquer identificação de usuário e senha de acesso que 
            você possa ter neste aplicativo são confidenciais e você é 
            responsável por manter a confidencialidade dessas informações.
          </Text>
        </TextBox>
        <TextBox>
          <Text>
            8.	 Podemos alterar os Termos e condições desses direitos de 
            vinculação a qualquer momento. Ao conectar-se continuamente ao 
            nosso aplicativo, você se compromete a seguir todos os termos 
            deste documento.
          </Text>
        </TextBox>
        <SubTitleBox>
          <SubTitle>
            DA COMPETIÇÃO
          </SubTitle>
        </SubTitleBox>
        <TextBox>
          <Text>
            9.	A Schiavoni Poker House patrocina ao longo de cada ano 6 (seis)
            temporadas do PSOP – Patos Series Of Poker, o mais importante evento 
            esportivo da modalidade para os seus integrantes.
          </Text>
        </TextBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Cada temporada é composta por 8 (oito) etapas realizadas de forma 
            consecutiva, sendo as 7 (sete) primeiras classificatórias para a 
            grande final, a ser realizada na oitava etapa, de onde sai o 
            novo campeão.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            O vencedor de cada temporada será denominado CAMPEÃO, e terá 
            a imagem do seu perfil e nome exibidos na página inicial do 
            aplicativo ao longo da duração de toda a temporada seguinte, 
            até o momento que se obtenha um novo detentor do posto.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            A oitava etapa (grande final) poderá ser, a critério dos 
            participantes envolvidos, realizada em local diverso, como casas 
            de Poker parceiras que estejam localizadas na cidade.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Durante a realização de cada etapa é terminantemente proibido 
            o palpite e interferência nas mãos em disputa por jogadores que 
            não estejam atuando com suas cartas ainda em jogo.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Ao participar de uma etapa você concorda que todo o castigo para 
            frouxo é pouco, e que esse comportamento, se observado em jogo, 
            será devidamente punido de acordo com as regras internacionais 
            que regem as competições de Poker Texas Hold’em.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            A resenha no antes, durante e depois de cada etapa é permitida e 
            o choro é livre.
          </BulletText>
        </BulletBox>
        <SubTitleBox>
          <SubTitle>
            DO RANKING E NÍVEL DE FORÇA
          </SubTitle>
        </SubTitleBox>
        <TextBox>
          <Text>
            10.	O desenvolvimento de cada temporada do PSOP poderá ser acompanhado
            por meio da página principal deste aplicativo, denominada "PSOP", 
            esta página será atualizada semanalmente após o fim de cada etapa 
            mostrará imediatamente a classificação do campeonato.
            `.
          </Text>
        </TextBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            A página "Statístics" exibirá a classificação dos jogadores levando 
            em conta os resultados válidos de cada jogador em todas as temporadas
            realizadas e ainda salvas nos servidores deste serviço, e contará com o 
            seguinte critério: 
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Aproveitamento acima de 60% dos pontos será igual a 5 estrelas.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Aproveitamento entre 60% e 50% dos pontos será igual a 4 estrelas.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Aproveitamento entre 50% e 40% dos pontos será igual a 3 estrelas.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Aproveitamento entre 40% e 30% dos pontos será igual a 2 estrelas.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Aproveitamento entre 30% e 20% dos pontos será igual a 1 estrelas.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Aproveitamento abaixo de 20% dos pontos será igual a 0 estrelas.
          </BulletText>
        </BulletBox>
        <SubTitleBox>
          <SubTitle>
            DA UNIÃO E PRESERVAÇÃO DO GRUPO
          </SubTitle>
        </SubTitleBox>
        <TextBox>
          <Text>
            11.	O maior patrimônio da Schiavoni Poker House é a união e 
            amizade dos seus membros, por esta razão é terminantemente 
            proibido qualquer traço de animosidade, inimizade, desgosto 
            ou chateação que dure além de 30 minutos após o encerramento 
            de cada etapa. Sendo assim você se compromete a resolver de 
            forma incondicional todas as questões potencialmente perigosas 
            a esta união o mais rápido possível.
          </Text>
        </TextBox>
        <TextBox>
          <Text>
            12.	Você concorda e se compromete a honrar com a máxima cunhada 
            pela Schiavoni Poker House e indevidamente plagiada pela cidade 
            de Las Vegas, Nevada, USA, que diz: “O que acontece no Poker, fica 
            no Poker”.
          </Text>
        </TextBox>
        <TextBox>
          <Text>
            13.	Ao se logar neste aplicativo você garante que nunca foi 
            preso injustamente, nunca ofereceu carne de churrasco apimentada 
            para o churrasqueiro/jogador durante uma etapa e que seu nome de 
            batismo e registrado em documentos válidos no território nacional 
            não é Cassiano Ricardo.
          </Text>
        </TextBox>
        <TextBox>
          <Text>
            14.	Você concorda que todas as diretrizes alistadas neste documento 
            se aplicam ao grupo de whatsapp “ Schiavoni Pokerhouse”.
          </Text>
        </TextBox>
        <SubTitleBox>
          <SubTitle>
            DO DESENVOLVIMENTO TÉCNICO ESPORTIVO
          </SubTitle>
        </SubTitleBox>
        <TextBox>
          <Text>
            15.	 A Schiavoni Poker House visa o desenvolvimento técnico/esportivo 
            de todos os seus integrantes, por esta razão pode sugerir maneiras 
            para que esse desenvolvimento ocorra. Em momento oportuno há o 
            desejo por parte da Casa em retomar a criação de novos conteúdos 
            do quadro “Dr. Bó Responde”. Você se compromete a aplicar as 
            sugestões e dicas desse canal de instrução tão logo esteja 
            disponível novamente.
          </Text>
        </TextBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Conversas informais com jogadores mais experientes e vencedores 
            são extremamente recomendadas para o seu desenvolvimento, mas, 
            caso o jogo de sua preferência reflita mais um estilo arrojado e 
            exótico, que não tenha compromisso com o resultado, também poderá 
            procurar o jogador/churrasqueiro/consultor técnico Diego Souza.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Não acesse o POKER NA CHAPA!
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText>
            Foldar J9 (Valete + Nove) é falta grave, passível de sério dano 
            a sua reputação, sendo avaliado pela comissão julgadora da Casa e
            Dept. de Criação as medidas punitivas cabíveis.
          </BulletText>
        </BulletBox>
        <SubTitleBox>
          <SubTitle>
            POLÍTICA DE PRIVACIDADE
          </SubTitle>
        </SubTitleBox>
        <TextBox>
          <Text>
            16.	Ao acessar este aplicativo, informações específicas sobre o 
            Usuário, como nome, apelido, e foto de perfil serão 
            armazenadas nos servidores da Schiavoni Poker House. Tais 
            informações serão estritamente usadas para a identificação dos 
            usuários e não serão publicadas para acesso geral fora da 
            plataforma. A Schiavoni Poker House, no entanto, não assume 
            nenhuma responsabilidade pela segurança dessas informações.
          </Text>
        </TextBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText style={{ color: '#ff0000' }}>
            Todos os usuários deverão ter a sua foto de perfil atualizada e
            publicada no aplicativo.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText style={{ color: '#ff0000' }}>
            Os administradores do aplicativo poderão cadastrar fotos de perfil dos 
            usuários. Para isso usarão fotos públicas, exemplo ('Perfil do whatsapp',
            'Instagram' ou 'Facebook') ou fotos que sirvam como identificador
            fornecidas pelo próprio usuário.
          </BulletText>
        </BulletBox>
        <BulletBox>
          <BulletPoint>*</BulletPoint>
          <BulletText style={{ color: '#ff0000' }}>
            Não serão admitidas para fotos de perfil de usuário imagens abstratas,
            ou outras, que não sirvam para a identificação visual do mesmo.
          </BulletText>
        </BulletBox>
        <TextBox>
          <Text>
            17.	O aplicativo é fornecido com todas as responsabilidades e 
            não assume compromissos, representações ou garantias implícitas 
            de qualquer tipo eventualmente contidas em seu conteúdo.
          </Text>
        </TextBox>
        <SubTitleBox>
          <SubTitle>
            DAS INDENIZAÇÕES
          </SubTitle>
        </SubTitleBox>
        <TextBox>
          <Text>
            18.	O usuário concorda em indenizar a Schiavoni Poker House, na 
            figura de seu presidente, e/ou qualquer um de seus afiliados 
            frente a ações, reclamações, responsabilidades, perdas, danos, 
            custos, demandas e despesas decorrentes do uso deste aplicativo 
            pelo usuário, incluindo qualquer reclamação pela violação de um 
            ou mais tópicos deste documento Termos e Condições.
          </Text>
        </TextBox>
        <MarginBotton />
      </Content>
      <ButtonContainer>
        {user.termsOfUse 
          ? 
            <TermsAlreadRead>
              Você já assinalou concordância com os Termos e Condições gerais 
              de uso do aplicativo.
            </TermsAlreadRead>
          :
            <ButtonRadio
              onPress={() => termsRead(user.doc_id)}
              type={user.termsOfUse}
              title='Eu declaro que li e concordo com os Termos e Condições
              gerais de uso do aplicativo'
            />
        }
      </ButtonContainer>
    </Container>
  );
};