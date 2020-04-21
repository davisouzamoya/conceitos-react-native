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
      console.log('id...'+id)
      const response = await api.post(`/repositories/${id}/like`);
      const repoLiked = response.data;

      const repoUpdate  = projects.map(repository => {
        console.log("repository.id..."+repository.id)
  
        if(repository.id === id){
          console.log(`dentro do if`)
            return repoLiked
            console.log("repoLiked "+repoLiked)
        }else{
          console.log(`dentro do else`)
         return repository
         console.log("repository "+repository)
        }
      })
      setProjects(repoUpdate)
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
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository} key={project.id}> 
              {project.title}     
            </Text>

            {/* <View style={styles.techsContainer}>
                {project.techs.map(tech =>
                    <Text style={styles.tech}>
                      {tech}
                    </Text>
                )}
              </View> */}

              <View style={styles.likesContainer}>
                <Text testID={`repository-likes-${project.id}`}
                  style={styles.likeText}  
                >
                  Curtidas {project.likes} 
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
