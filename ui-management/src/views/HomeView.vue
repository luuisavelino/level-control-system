<template>
  <div class="home">
    <header>
      <h1>IoT System Control</h1>
      <p>Remotely control your IoT devices with ease.</p>
    </header>
    <section class="systems">
      <div class="system-card" v-for="(system, index) in systems" :key="index">
        <h2>{{ system.name }}</h2>
        <p>{{ system.description }}</p>
        <button @click="controlSystem(system)">Control</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      systems: [
        {
          name: 'Smart Lights',
          description: 'Control your home lighting remotely.',
        },
        {
          name: 'Smart Thermostat',
          description: 'Adjust the temperature of your home from anywhere.',
        },
        {
          name: 'Security Cameras',
          description: 'Monitor your property using IoT cameras.',
        },
        // Add more IoT systems here
      ],
    };
  },
  methods: {
    controlSystem(system) {
      // Implement control logic for the selected system
      console.log(`Controlling ${system.name}`);
      // You can navigate to a specific system's control page here
      // Example: this.$router.push(`/system/${system.name}`);
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}

header {
  background-color: #007BFF;
  color: white;
  padding: 20px;
}

.systems {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}

.system-card {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
  max-width: 300px;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
