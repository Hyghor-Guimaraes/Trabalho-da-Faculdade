import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  SafeAreaView 
} from 'react-native';

export default function App() {
  const [remedios, setRemedios] = useState([
    { id: '1', nome: 'Dipirona', horario: '08:00', tomado: false },
    { id: '2', nome: 'Vitamina C', horario: '12:00', tomado: true },
  ]);

  const [nome, setNome] = useState('');
  const [horario, setHorario] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const salvarRemedio = () => {
    if (!nome || !horario) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (editandoId) {
      setRemedios(remedios.map(item => 
        item.id === editandoId ? { ...item, nome, horario } : item
      ));
      setEditandoId(null);
    } else {
      const novoRemedio = {
        id: Math.random().toString(),
        nome,
        horario,
        tomado: false
      };
      setRemedios([...remedios, novoRemedio]);
    }

    setNome('');
    setHorario('');
  };

  const alternarStatus = (id) => {
    setRemedios(remedios.map(item => 
      item.id === id ? { ...item, tomado: !item.tomado } : item
    ));
  };

  const iniciarEdicao = (item) => {
    setNome(item.nome);
    setHorario(item.horario);
    setEditandoId(item.id);
  };

  const deletarRemedio = (id) => {
    Alert.alert(
      'Excluir',
      'Tem certeza que deseja remover este remédio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => setRemedios(remedios.filter(item => item.id !== id)) }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>⏰ Hora do Remédio</Text>

      <View style={styles.formulario}>
        <TextInput 
          style={styles.input} 
          placeholder="Nome do Remédio" 
          value={nome}
          onChangeText={setNome}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Horário (ex: 14:00)" 
          value={horario}
          onChangeText={setHorario}
        />
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarRemedio}>
          <Text style={styles.textBotao}>{editandoId ? 'Atualizar' : 'Adicionar'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={remedios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.tomado && styles.cardTomado]}>
            <View style={styles.cardInfo}>
              <Text style={[styles.nomeRemedio, item.tomado && styles.textoRiscado]}>
                {item.nome}
              </Text>
              <Text style={styles.horarioRemedio}>📅 Horário: {item.horario}</Text>
            </View>

            <View style={styles.acoes}>
              <TouchableOpacity onPress={() => alternarStatus(item.id)} style={styles.btnCheck}>
                <Text>{item.tomado ? '✅' : '🟩'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => iniciarEdicao(item)} style={styles.btnEditar}>
                <Text>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarRemedio(item.id)} style={styles.btnDeletar}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20, paddingTop: 50 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 20 },
  formulario: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 10, borderRadius: 5, marginBottom: 10, backgroundColor: '#FAFAFA' },
  botaoSalvar: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 5, alignItems: 'center' },
  textBotao: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'between', alignItems: 'center', marginBottom: 10, elevation: 1 },
  cardTomado: { backgroundColor: '#E8F5E9', borderColor: '#A5D6A7', borderWidth: 1 },
  cardInfo: { flex: 1 },
  nomeRemedio: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  horarioRemedio: { color: '#666', marginTop: 4 },
  textoRiscado: { textDecorationLine: 'line-through', color: '#999' },
  acoes: { flexDirection: 'row', gap: 15 },
  btnCheck: { padding: 5 },
  btnEditar: { padding: 5 },
  btnDeletar: { padding: 5 }
});