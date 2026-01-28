import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { certificates, skills, teamMember } from '../data/TeamMembersData';

export default function TeamMembers() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.main}>
        
        {teamMember.map(item => (
          <View key={item.id} style={styles.section}>
            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>{item.value}</Text>
            </View>

            <View style={styles.divider} />
          </View>
        ))}

        {skills.map(item => (
          <View key={item.id} style={styles.section}>
            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>{item.value}</Text>
            </View>

            <View style={styles.divider} />
          </View>
        ))}

        {certificates.map(item => (
          <View key={item.id} style={styles.section}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>{item.value}</Text>
            </View>
          </View>
        ))}

      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  main: {
    margin: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
  },

  section: {
    marginBottom: 16,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 10,
  },

  emptyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f8fafc',
  },
  emptyText: {
    fontSize: 14,
    color: '#64748b',
  },

  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginTop: 16,
  },
});
