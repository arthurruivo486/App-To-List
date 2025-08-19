import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://potential-carnival-7v79x69rw64gfr447-3000.app.github.dev/api/user"
        );
        
        console.log("API Response:", response.data);
        
        // Ajuste para acessar response.data.users
        if (response.data && response.data.users) {
          setUsers(response.data.users);
        } else {
          setError("Estrutura de dados inesperada");
          console.warn("Estrutura esperada: { users: [...] }");
        }
      } catch (err) {
        console.error("Erro na requisição:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const renderUserItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemEmail}>{item.email}</Text>
      <Text style={styles.itemId}>ID: {item.id}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Erro ao carregar dados:</Text>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Nenhum usuário encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários ({users.length})</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// Os estilos permanecem os mesmos do código anterior
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  itemId: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
  },
  errorMessage: {
    color: 'darkred',
    fontSize: 14,
  },
});