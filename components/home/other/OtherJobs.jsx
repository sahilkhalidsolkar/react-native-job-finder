import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

// import styles from "./otherjobs.style.js";
// import styles from "./nearbyjobs.style";

import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";
import styles from "./nearbyjobs.style";

const OtherJobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "Software developer",
    num_pages: "1",
  });
  const showAll=(searchTerm)=>{
    router.push(`/search/${searchTerm||'Software developer'}`) 
}
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Other jobs</Text>
        <TouchableOpacity onPress={()=>showAll("other jobs")}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default OtherJobs;
