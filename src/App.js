import React, { useState,useEffect } from "react";
import api from './services/api'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [projects,setProjects]= useState([])

  useEffect(() => {
    api.get('/repositories',[]).then(response =>{
      
      setProjects(response.data)
    })
  },[])
  
  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    
    try{
      
      const response = await api.post(`/repositories/${id}/like`);
      const { likes } = response.data;
      

      // const newProject = projects.filter(p => p.id === id);
      // const oldProject = projects.filter(p => p.id !== id);
      const newProject = projects.map(davi => {
        
        if(davi.id === id) davi.likes = likes
        return davi;
      })
      // newProject[0].likes = repoLiked.likes
      // console.log('newObject', [...projects, newProject])
      setProjects(newProject)
     }catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
      <FlatList  
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({item: project}) => (
            <View style={styles.repositoryContainer} key={project.id}>
              <Text style={styles.repository}> 
                {project.title}
              </Text>

              <View style={styles.techsContainer}>
                {project.techs.map((tech, i) =>
                  <Text style={styles.tech} key={i}>
                    {tech}
                  </Text>
                )}
              </View>

              <View style={styles.likesContainer}>
                <Text testID={`repository-likes-${project.id}`}
                  style={styles.likeText}  
                >
                 {project.likes} curtida{(project.likes > 1) ? 's' : ''}
                </Text>
            
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(project.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${project.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}   
      />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
